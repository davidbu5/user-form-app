import { IStringsRepo } from "./interfaces/IStringsRepo";
import { EnglishStringsRepo } from "./stringRepos/EnglishStringRepo";
import { HebrewStringsRepo } from "./stringRepos/HebrewStringsRepo";

enum Languages {
    English,
    Hebrew
}

export class LanguageModule {

    private static _stringsRepo: IStringsRepo = EnglishStringsRepo;

    public static set language(newLanguage: Languages) {
        switch (newLanguage) {
            case (Languages.English): {
                this._stringsRepo = EnglishStringsRepo;
                break;
            }
            case (Languages.Hebrew): {
                this._stringsRepo = HebrewStringsRepo;
                break;
            }
        }
    }
    
    public static get StringsRepo() { return this._stringsRepo; }
}