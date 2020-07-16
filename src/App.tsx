import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormFactory, FormFieldType } from './common/FormFactory';

function App() {
  return (
    <div className="App">
    </div>
  );
}

function createRegisterForm() {
  const form = FormFactory.create()
  
  const personalSection = form.addSection("Personal");
  const firstNameField = personalSection.addField("first_name", "First Name", FormFieldType.Text, true);
  const lastNameField = personalSection.addField("last_name", "Last Name", FormFieldType.Text, true);
  const titleField = personalSection.addField("first_name", "First Name", FormFieldType.Text);
  
  const addressSection = form.addSection("Address");
  const countryField = addressSection.addField("country", "Country", FormFieldType.Text, true);
  const cityField = addressSection.addField("city", "City", FormFieldType.Text);
  const streetField = addressSection.addField("street", "Street", FormFieldType.Text);
  
  const contactabilitySection = form.addSection("Contactability");
  const emailField = personalSection.addField("email", "Email", FormFieldType.Email, true);
  const phoneField = personalSection.addField("phone", "Phone", FormFieldType.Phone);
  const optinField = personalSection.addField("optin", "Optin", FormFieldType.Checkbox);

  return form;
}


export default App;
