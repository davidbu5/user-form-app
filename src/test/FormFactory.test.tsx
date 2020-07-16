import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { FormFactory } from '../common/formFactory';

test('form field valid name not required invalid', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("first_name", "First Name", (value) => !!value)
  expect(form.isValid()).toEqual(false);
});
test('form field valid name not required valid', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("first_name", "First Name", (value) => !!value)
  field.value = "david"
  expect(form.isValid()).toEqual(true);
});
test('form field valid name required', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const field = section.addField("first_name", "First Name", (value) => !!value, true)
  expect(form.isValid()).toEqual(false);
});

test('form field email valid', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const field = section.addField("email", "Email", emailRegexp)
  field.value = "asd@asd.asd";
  expect(form.isValid()).toEqual(true);
});
test('form field email invalid', () => {
  const form = FormFactory.create();
  const section = form.addSection("Beneficiery")
  const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const field = section.addField("email", "Email", emailRegexp)
  expect(form.isValid()).toEqual(false);
});

test('form get values', () => {
  const form = FormFactory.create();

  const section = form.addSection("Beneficiery")
  const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const field = section.addField("email", "Email", emailRegexp)
  const email = "asd@asd.asd"
  field.value = email;

  const section2 = form.addSection("Address")
  const field2 = section.addField("country", "Country", (value) => !!value)
  const country = "Israel";
  field2.value = country

  expect(form.getValues()).toEqual([{ email }, { country }]);
});
