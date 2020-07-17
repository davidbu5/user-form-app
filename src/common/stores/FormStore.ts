import { IStringsRepo } from "../interfaces/IStringsRepo";
import { observable, computed } from 'mobx';

export enum FormFieldType {
    Text,
    Email,
    Phone,
    Checkbox,
    List
}

export class ObservableFormStore {

    @observable public sections: ObservableFormSection[] = [];

    public addSection = (placeholderStringName: keyof IStringsRepo) => {
        const newSection = new ObservableFormSection(placeholderStringName);
        this.sections.push(newSection);
        return newSection;
    }
    @computed get isValid() { return this.sections.every(section => section.isValid); }
    @computed get getValues() { return this.sections.map(section => section.getValues).flat(); };
}

export class ObservableFormSection {
    @observable fields: ObservableFormField[] = [];

    constructor(public placeholderStringName: keyof IStringsRepo) {
    }

    public addField = (
        name: string,
        placeholder: keyof IStringsRepo,
        fieldType: FormFieldType,
        required: boolean = false,
        valuesList?: string[]
    ) => {
        const newField = new ObservableFormField(name, placeholder, fieldType, required, valuesList);
        this.fields.push(newField);
        return newField;
    }

    @computed get isValid() { return this.fields.every(field => field.isValid); }
    @computed get getValues() {
        return this.fields.map(field => {
            const valueDictionary: { [fieldName: string]: FormFieldValueType } = {};
            valueDictionary[field.name] = field.value;
            return valueDictionary;
        })
    }
}

export type FormFieldValueType = string | boolean;

export class ObservableFormField {

    private static _emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private static _phoneValidator = /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;

    private _name: string;
    private _required: boolean;
    
    @observable value: FormFieldValueType;
    public placeholderStringName: keyof IStringsRepo;
    public fieldType: FormFieldType;
    public valuesList: string[] | null = null;

    constructor(name: string,
        placeholderStringName: keyof IStringsRepo,
        fieldType: FormFieldType,
        required: boolean = false,
        valuesList?: string[]) {

        this._name = name;
        this.placeholderStringName = placeholderStringName;
        this.fieldType = fieldType;
        this._required = required;
        if (fieldType === FormFieldType.List) {
            if (valuesList) {
                this.valuesList = valuesList;
            } else {
                throw "List form field should get values list"
            }
        }

        if (this.fieldType === FormFieldType.Checkbox) {
            this.value = false;
        } else {
            this.value = "";
        }
    }

    get isValid() {
        if (this._required && !this.value) {
            return false;
        }
        switch (this.fieldType) {
            case (FormFieldType.Text): {
                if (this.value && typeof (this.value) === "string" &&
                    this.value.length >= 1) {
                    return true;
                }
            }
            case (FormFieldType.Email): {
                if (this.value && typeof (this.value) === "string" &&
                    ObservableFormField._emailValidator.test(this.value)) {
                    return true;
                }
            }
            case (FormFieldType.Phone): {
                if (this.value && typeof (this.value) === "string" &&
                    ObservableFormField._phoneValidator.test(this.value)) {
                    return true;
                }
            }
            case (FormFieldType.Checkbox): {
                if (typeof (this.value) === "boolean") {
                    return true;
                }
            }

                return false;
        }
    }

    get validationErrorMessage() {
        // if (!this.isValid) {

        //     if (this._required && !this.value) {
        //         return ;
        //     }
        //     switch (this._fieldType) {
        //         case (FormFieldType.Text): {
        //             if (this.value && typeof (this.value) === "string" &&
        //                 this.value.length >= 1) {
        //                 return true;
        //             }
        //         }
        //         case (FormFieldType.Email): {
        //             if (this.value && typeof (this.value) === "string" &&
        //                 FormField._emailValidator.test(this.value)) {
        //                 return true;
        //             }
        //         }
        //         case (FormFieldType.Phone): {
        //             if (this.value && typeof (this.value) === "string" &&
        //                 FormField._phoneValidator.test(this.value)) {
        //                 return true;
        //             }
        //         }
        //         case (FormFieldType.Checkbox): {
        //             if (typeof (this.value) === "boolean") {
        //                 return true;
        //             }
        //         }
        //     }

        //     return "";
        // }
        throw "Un implemented"
    }

    get name() { return this._name; };
}