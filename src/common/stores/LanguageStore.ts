import { observable, computed } from 'mobx';
import { IStringsRepo } from '../interfaces/IStringsRepo';
import { EnglishStringsRepo } from '../i18/en';
import { HebrewStringsRepo } from '../i18/he';

export type Language = 'he' | 'en';

export class ObservedLanguageStore {

    @observable language: Language = "en";

    getString(stringName: keyof IStringsRepo | null) {
        if (!stringName) {
            return "";
        }
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