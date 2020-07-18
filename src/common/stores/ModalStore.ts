import { observable } from 'mobx';
import { IStringsRepo } from '../interfaces/IStringsRepo';

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