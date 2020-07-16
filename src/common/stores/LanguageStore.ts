import { observable, computed } from 'mobx';
import { IStringsRepo } from '../interfaces/IStringsRepo';
import { EnglishStringsRepo } from '../i18/EnglishStringRepo';
import { HebrewStringsRepo } from '../i18/HebrewStringsRepo';

export type Language = 'he' | 'en';

export class ComputedLanguageStore {

    @observable language: Language = "en";

    getString(stringName: keyof IStringsRepo) {
        switch (this.language) {
            case "en": {
                return EnglishStringsRepo[stringName];
            }
            case "he": {
                return HebrewStringsRepo[stringName];
            }
        }
    }
}