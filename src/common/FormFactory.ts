import { threadId } from "worker_threads";
import { LanguageModule } from "./LanguageModule";

export class FormFactory {

    public static create() {
        return new Form();
    }
}

export enum FormFieldType {
    Text,
    Email,
    Phone,
    Checkbox
}

class Form {

    private _sections: FormSection[] = [];

    public addSection = (name: string) => {
        const newSection = new FormSection(name);
        this._sections.push(newSection);
        return newSection;
    }
    get isValid() { return this._sections.every(section => section.isValid); }
    public getValues = () => this._sections.map(section => section.getValues()).flat();
    get sections() { return this._sections; }
}

class FormSection {
    private _name: string;
    private _fields: FormField[] = [];

    constructor(name: string) {
        this._name = name;
    }

    public addField = (
        name: string,
        placeholder: () => string,
        fieldType: FormFieldType,
        required: boolean = false
    ) => {
        const newField = new FormField(name, placeholder, fieldType, required);
        this._fields.push(newField);
        return newField;
    }
    get isValid() { return this._fields.every(field => field.isValid); }
    public getValues = () => this._fields.map(field => {
        const valueDictionary: { [fieldName: string]: FormFieldValueType } = {};
        valueDictionary[field.name] = field.value;
        return valueDictionary;
    })
    get fields() { return this._fields; }
}

type FormFieldValueType = string | boolean;

class FormField {

    private static _emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private static _phoneValidator = /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;

    private _name: string;
    private _placeholder: () => string;
    private _fieldType: FormFieldType;
    private _required: boolean;
    private _value: FormFieldValueType;

    constructor(name: string,
        placeholder: () => string,
        fieldType: FormFieldType,
        required: boolean = false) {

        this._name = name;
        this._placeholder = placeholder;
        this._fieldType = fieldType;
        this._required = required;

        if (this._fieldType === FormFieldType.Checkbox) {
            this._value = false;
        } else {
            this._value = "";
        }
    }

    get isValid() {
        if (this._required && !this.value) {
            return false;
        }
        switch (this._fieldType) {
            case (FormFieldType.Text): {
                if (this._value && typeof (this._value) === "string" &&
                    this._value.length >= 1) {
                    return true;
                }
            }
            case (FormFieldType.Email): {
                if (this._value && typeof (this._value) === "string" &&
                    FormField._emailValidator.test(this._value)) {
                    return true;
                }
            }
            case (FormFieldType.Phone): {
                if (this._value && typeof (this._value) === "string" &&
                    FormField._phoneValidator.test(this._value)) {
                    return true;
                }
            }
            case (FormFieldType.Checkbox): {
                if (typeof (this._value) === "boolean") {
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
        //             if (this._value && typeof (this._value) === "string" &&
        //                 this._value.length >= 1) {
        //                 return true;
        //             }
        //         }
        //         case (FormFieldType.Email): {
        //             if (this._value && typeof (this._value) === "string" &&
        //                 FormField._emailValidator.test(this._value)) {
        //                 return true;
        //             }
        //         }
        //         case (FormFieldType.Phone): {
        //             if (this._value && typeof (this._value) === "string" &&
        //                 FormField._phoneValidator.test(this._value)) {
        //                 return true;
        //             }
        //         }
        //         case (FormFieldType.Checkbox): {
        //             if (typeof (this._value) === "boolean") {
        //                 return true;
        //             }
        //         }
        //     }

        //     return "";
        // }
        throw "Un implemented"
        return ""
    }

    get name() { return this._name; };

    get placeholder() { return this._placeholder(); };

    get value() { return this._value; };
    set value(newValue: FormFieldValueType) { this._value = newValue; };
}