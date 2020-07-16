import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { LanguageModule, Languages } from '../common/LanguageModule';

test('language module english default', () => {
    const english = LanguageModule.StringsRepo.form.back;
    expect(english).toEqual("Back");
});
test('language module set hebrew', () => {
    LanguageModule.language = Languages.Hebrew;
    const english = LanguageModule.StringsRepo.form.back;
    expect(english).toEqual("אחורה");
});