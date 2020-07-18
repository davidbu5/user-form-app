import React from 'react';
import './App.css';
import { ObservableFormStore, FormFieldType } from './common/stores/FormStore';
import { observer } from 'mobx-react';
import { Form } from './components/Form';
import { ObservedLanguageStore } from './common/stores/LanguageStore';
import { FormApi } from './common/api/FormApi';
import { ObservedAuthStore as ObservableAuthStore } from './common/stores/AuthStore';
import { Login } from './components/Login';
import { LanguageSwitch } from './components/LagnuageSwitch';
import { AuthApi } from './common/api/AuthApi';
import { ObservedModalStore } from './common/stores/ModalStore';
import { Modal } from './components/Modal';

interface IAppState {
  formStore?: ObservableFormStore;
  authStore?: ObservableAuthStore;
  langStore: ObservedLanguageStore;
  modalStore: ObservedModalStore;
  loadingCountries?: boolean;
  onAuthenticationFailure?: boolean;
  countries?: string[];
}

@observer
class App extends React.Component<{}, IAppState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      onAuthenticationFailure: false,
      loadingCountries: true,
      langStore: new ObservedLanguageStore(),
      modalStore: new ObservedModalStore()
    };
  }

  async createRegisterFormStore(countries: string[]) {
    const form = new ObservableFormStore()

    const personalSection = form.addSection("personal");
    personalSection.addField("first_name", "firstName", FormFieldType.Text, true);
    personalSection.addField("last_name", "lastName", FormFieldType.Text, true);
    personalSection.addField("title", "title", FormFieldType.Text);

    const addressSection = form.addSection("address");
    addressSection.addField("country", "country", FormFieldType.List, true, countries);
    addressSection.addField("city", "city", FormFieldType.Text);
    addressSection.addField("street", "street", FormFieldType.Text);

    const contactabilitySection = form.addSection("contactability");
    contactabilitySection.addField("email", "email", FormFieldType.Email, true);
    contactabilitySection.addField("phone", "phone", FormFieldType.Phone);
    contactabilitySection.addField("optin", "optin", FormFieldType.Checkbox);

    return form;
  }

  onLoginSubmit = (userName: string, password: string) => {
    const authStore = new ObservableAuthStore(userName, password)

    AuthApi.authenticate(authStore).then((response: boolean) => {
      if (response !== true) {
        throw new Error();
      }
      this.setState({
        authStore, loadingCountries: true, onAuthenticationFailure: false
      }, () => {
        FormApi.getCountriesNames(authStore).then((countries: string[]) => {
          this.setState({ loadingCountries: false, countries })

          this.createRegisterFormStore(countries).then(formStore => {
            this.setState({ formStore })
          });
        }).catch(() => {
          this.setState({ loadingCountries: false })
        })
      })
    }).catch(() => {
      this.setState({ onAuthenticationFailure: true })
    })
  }

  getAppView() {
    if (!this.state.authStore) {
      return <>
        <Login langStore={this.state.langStore} onSubmit={this.onLoginSubmit} />
        {
          this.state.onAuthenticationFailure ?
            <div>{this.state.langStore.getString("authenticationFailedMessage")}</div> :
            ""
        }
      </>
    } else if (this.state.authStore && this.state.formStore) {
      return <Form store={this.state.formStore} langStore={this.state.langStore} authStore={this.state.authStore} modalStore={this.state.modalStore} ></Form>;
    } else if (this.state.loadingCountries) {
      return <div>{this.state.langStore.getString("loadingForm")}</div>
    } else {
      return <div>{this.state.langStore.getString("failedLoadingForm")}</div>
    }
  }

  render() {
    return <>
      {this.getAppView()}
      <LanguageSwitch langStore={this.state.langStore} />
      {
        this.state.modalStore.isOpen ?
          <Modal langStore={this.state.langStore} modalStore={this.state.modalStore} /> :
          ""
      }
    </>
  }
}


export default App;
