import { observable } from 'mobx';
import { IStringsRepo } from '../interfaces/IStringsRepo';
import { EnglishStringsRepo } from '../i18/en';
import { HebrewStringsRepo } from '../i18/he';

export type Language = 'he' | 'en';

export class ObservedModalStore {

    @observable isOpen: boolean = false;
    @observable modalTextStringName: keyof IStringsRepo = 'emptyString';

    open(modalTextStringName: keyof IStringsRepo) {
        this.modalTextStringName = modalTextStringName;
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
        this.modalTextStringName = 'emptyString'
    }
}