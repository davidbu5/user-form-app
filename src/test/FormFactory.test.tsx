import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { FormFactory, FormFieldType } from '../common/FormFactory';

test('form field valid name not required invalid', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("first_name", "First Name", FormFieldType.Text)
  expect(form.isValid).toEqual(false);
});
test('form field valid name not required valid', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("first_name", "First Name", FormFieldType.Text)
  field.value = "david"
  expect(form.isValid).toEqual(true);
});
test('form field valid name required', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("first_name", "First Name", FormFieldType.Text, true)
  expect(form.isValid).toEqual(false);
});
test('form field valid name empty', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("first_name", "First Name", FormFieldType.Text, true)
  expect(form.isValid).toEqual(false);
});
test('form field valid name invalid', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("first_name", "First Name", FormFieldType.Text, true)
  field.value = "";
  expect(form.isValid).toEqual(false);
});

test('form field email valid', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  field.value = "asd@asd.asd";
  expect(form.isValid).toEqual(true);
});
test('form field email invalid', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  field.value = "a@a"
  expect(form.isValid).toEqual(false);
});
test('form field email empty', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  expect(form.isValid).toEqual(false);
});

test('form field phone valid not local cellular', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  field.value = "+972-50-5555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone valid not local cellular no separator', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  field.value = "+972505555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone valid not local phone', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  field.value = "+972-45555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone valid not local phone no separator', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  field.value = "+97245555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone local cellular', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  field.value = "050-5555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone local cellular no separator', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  field.value = "0505555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone local phone', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  field.value = "04-5555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone local phone no separator', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  field.value = "045555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone invalid', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  field.value = "555555";
  expect(form.isValid).toEqual(false);
});
test('form field phone empty', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  expect(form.isValid).toEqual(false);
});

test('form get values', () => {
  const form = FormFactory.create();

  const section = form.addSection("Beneficiery")
  const field = section.addField("email", "Email", FormFieldType.Email)
  const email = "asd@asd.asd"
  field.value = email;

  const section2 = form.addSection("Address")
  const field2 = section.addField("country", "Country", FormFieldType.Text)
  const country = "Israel";
  field2.value = country

  expect(form.getValues()).toEqual([{ email }, { country }]);
});
