import React from 'react';
import './App.css';
import { FormFactory, FormFieldType } from './common/stores/FormStore';

function App() {
  return (
    <div className="App">
    </div>
  );
}

function createRegisterForm() {
  const form = FormFactory.create()
  
  const personalSection = form.addSection("Personal");
  personalSection.addField("first_name", "firstName", FormFieldType.Text, true);
  personalSection.addField("last_name", "lastName", FormFieldType.Text, true);
  personalSection.addField("title", "title", FormFieldType.Text);
  
  const addressSection = form.addSection("Address");
  addressSection.addField("country", "country", FormFieldType.Text, true);
  addressSection.addField("city", "city", FormFieldType.Text);
  addressSection.addField("street", "street", FormFieldType.Text);
  
  const contactabilitySection = form.addSection("Contactability");
  personalSection.addField("email", "email", FormFieldType.Email, true);
  personalSection.addField("phone", "phone", FormFieldType.Phone);
  personalSection.addField("optin", "optin", FormFieldType.Checkbox);

  return form;
}


export default App;
