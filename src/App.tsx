import React from 'react';
import './App.css';
import { ObservableFormStore, FormFieldType } from './common/stores/FormStore';
import { observer } from 'mobx-react';
import { Form } from './components/Form';
import { ObservedLanguageStore } from './common/stores/LanguageStore';

const formStore = createRegisterFormStore();
const langStore = new ObservedLanguageStore();

@observer
class App extends React.Component {
  render() {
    return <Form store={formStore} langStore={langStore}></Form>
  }
}

function createRegisterFormStore() {
  const form = new ObservableFormStore()
  
  const personalSection = form.addSection("personal");
  personalSection.addField("first_name", "firstName", FormFieldType.Text, true);
  personalSection.addField("last_name", "lastName", FormFieldType.Text, true);
  personalSection.addField("title", "title", FormFieldType.Text);
  
  const addressSection = form.addSection("address");
  addressSection.addField("country", "country", FormFieldType.Text, true);
  addressSection.addField("city", "city", FormFieldType.Text);
  addressSection.addField("street", "street", FormFieldType.Text);
  
  const contactabilitySection = form.addSection("contactability");
  contactabilitySection.addField("email", "email", FormFieldType.Email, true);
  contactabilitySection.addField("phone", "phone", FormFieldType.Phone);
  contactabilitySection.addField("optin", "optin", FormFieldType.Checkbox);

  return form;
}


export default App;
