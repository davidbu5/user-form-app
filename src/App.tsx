import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormFactory, FormFieldType } from './common/FormFactory';
import { LanguageModule } from './common/LanguageModule';

function App() {
  return (
    <div className="App">
    </div>
  );
}

function createRegisterForm() {
  const form = FormFactory.create()
  
  const personalSection = form.addSection("Personal");
  personalSection.addField("first_name", () => LanguageModule.StringsRepo.form.placeholdersBySections.personal.firstName, FormFieldType.Text, true);
  personalSection.addField("last_name", () => LanguageModule.StringsRepo.form.placeholdersBySections.personal.lastName, FormFieldType.Text, true);
  personalSection.addField("title", () => LanguageModule.StringsRepo.form.placeholdersBySections.personal.title, FormFieldType.Text);
  
  const addressSection = form.addSection("Address");
  addressSection.addField("country", () => LanguageModule.StringsRepo.form.placeholdersBySections.address.country, FormFieldType.Text, true);
  addressSection.addField("city", () => LanguageModule.StringsRepo.form.placeholdersBySections.address.city, FormFieldType.Text);
  addressSection.addField("street", () => LanguageModule.StringsRepo.form.placeholdersBySections.address.street, FormFieldType.Text);
  
  const contactabilitySection = form.addSection("Contactability");
  personalSection.addField("email", () => LanguageModule.StringsRepo.form.placeholdersBySections.contactability.email, FormFieldType.Email, true);
  personalSection.addField("phone", () => LanguageModule.StringsRepo.form.placeholdersBySections.contactability.phone, FormFieldType.Phone);
  personalSection.addField("optin", () => LanguageModule.StringsRepo.form.placeholdersBySections.contactability.optin, FormFieldType.Checkbox);

  return form;
}


export default App;
