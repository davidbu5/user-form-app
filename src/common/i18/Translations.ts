import { HebrewStringsRepo } from "./HebrewStringsRepo";
import { EnglishStringsRepo } from "./EnglishStringRepo";

export const Translations = {
    en: {
        locale: 'en-US',
        messages: EnglishStringsRepo
    },
    he: {
        locale: 'he',
        messages: HebrewStringsRepo
    }
}