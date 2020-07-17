import { ObservableFormStore, FormFieldType } from '../common/stores/FormStore';

test('form field valid name not required empty', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("first_name", "First Name" as any, FormFieldType.Text)
  expect(form.isValid).toEqual(true);
});
test('form field valid name not required invalid', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("first_name", "First Name" as any, FormFieldType.Text)
  field.value = ""
  expect(form.isValid).toEqual(true);
});
test('form field valid name not required valid', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("first_name", "First Name" as any, FormFieldType.Text)
  field.value = "david"
  expect(form.isValid).toEqual(true);
});
test('form field valid name required', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("first_name", "First Name" as any, FormFieldType.Text, true)
  expect(form.isValid).toEqual(false);
});
test('form field valid name required empty', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("first_name", "First Name" as any, FormFieldType.Text, true)
  expect(form.isValid).toEqual(false);
});
test('form field valid name required invalid', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("first_name", "First Name" as any, FormFieldType.Text, true)
  field.value = "";
  expect(form.isValid).toEqual(false);
});

test('form field email valid', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("email", "Email" as any, FormFieldType.Email)
  field.value = "asd@asd.asd";
  expect(form.isValid).toEqual(true);
});
test('form field email invalid', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("email", "Email" as any, FormFieldType.Email)
  field.value = "a@a"
  expect(form.isValid).toEqual(false);
});
test('form field email empty', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("email", "Email" as any, FormFieldType.Email)
  expect(form.isValid).toEqual(true);
});

test('form field phone valid not local cellular', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("phone", "Phone" as any, FormFieldType.Phone)
  field.value = "+972-50-5555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone valid not local cellular no separator', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("phone", "Phone" as any, FormFieldType.Phone)
  field.value = "+972505555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone valid not local phone', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("phone", "Phone" as any, FormFieldType.Phone)
  field.value = "+972-45555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone valid not local phone no separator', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("phone", "Phone" as any, FormFieldType.Phone)
  field.value = "+97245555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone local cellular', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("phone", "Phone" as any, FormFieldType.Phone)
  field.value = "050-5555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone local cellular no separator', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("phone", "Phone" as any, FormFieldType.Phone)
  field.value = "0505555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone local phone', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("phone", "Phone" as any, FormFieldType.Phone)
  field.value = "04-5555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone local phone no separator', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("phone", "Phone" as any, FormFieldType.Phone)
  field.value = "045555555";
  expect(form.isValid).toEqual(true);
});
test('form field phone invalid', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  const field = section.addField("phone", "Phone" as any, FormFieldType.Phone)
  field.value = "555555";
  expect(form.isValid).toEqual(false);
});
test('form field phone empty', () => {
  const form = new ObservableFormStore();
  const section = form.addSection("personal")
  section.addField("phone", "Phone" as any, FormFieldType.Phone)
  expect(form.isValid).toEqual(true);
});

test('form get values', () => {
  const form = new ObservableFormStore();

  const section = form.addSection("personal")
  const field = section.addField("email", "Email" as any, FormFieldType.Email)
  const email = "asd@asd.asd"
  field.value = email;

  const section2 = form.addSection("address")
  const field2 = section.addField("country", "Country" as any, FormFieldType.Text)
  const country = "Israel";
  field2.value = country

  expect(form.getValues).toEqual([{ email }, { country }]);
});
