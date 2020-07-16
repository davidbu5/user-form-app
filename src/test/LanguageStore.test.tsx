import { ObservedLanguageStore } from "../common/stores/LanguageStore";

test('language storre should return english by default', () => {
  const store = new ObservedLanguageStore()
  expect(store.getString("submit")).toEqual("Submit");
});

test('language storre should return hebrew after changing', () => {
  const store = new ObservedLanguageStore()
  store.language = "he";
  expect(store.getString("submit")).toEqual("שליחה");
});