import React from 'react';
import './App.css';
import { ObservableFormStore, FormFieldType } from './common/stores/FormStore';
import { observer } from 'mobx-react';
import { Form } from './components/Form';
import { ObservedLanguageStore } from './common/stores/LanguageStore';
import { FormApi } from './common/api/FormApi';

interface IAppState {
  formStore: ObservableFormStore;
}

const langStore = new ObservedLanguageStore();

@observer
class App extends React.Component<{}, IAppState> {

  constructor(props: {}) {
    super(props);

    this.state = { formStore:  new ObservableFormStore() };
  }

  componentDidMount() {
    createRegisterFormStore().then(formStore => {
      this.setState({ formStore })
    });
  }

  render() {
    return <Form store={this.state.formStore} langStore={langStore}></Form>
  }
}

async function createRegisterFormStore() {
  const form = new ObservableFormStore()

  const personalSection = form.addSection("personal");
  personalSection.addField("first_name", "firstName", FormFieldType.Text, true);
  personalSection.addField("last_name", "lastName", FormFieldType.Text, true);
  personalSection.addField("title", "title", FormFieldType.Text);

  const addressSection = form.addSection("address");
  addressSection.addField("country", "country", FormFieldType.List, true, await FormApi.getCountriesNames());
  addressSection.addField("city", "city", FormFieldType.Text);
  addressSection.addField("street", "street", FormFieldType.Text);

  const contactabilitySection = form.addSection("contactability");
  contactabilitySection.addField("email", "email", FormFieldType.Email, true);
  contactabilitySection.addField("phone", "phone", FormFieldType.Phone);
  contactabilitySection.addField("optin", "optin", FormFieldType.Checkbox);

  return form;
}


export default App;
