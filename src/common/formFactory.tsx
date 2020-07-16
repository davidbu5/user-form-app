import { threadId } from "worker_threads";

export class FormFactory {

    public static create() {
        return new Form();
    }
}

class Form {

    private _sections: FormSection[] = [];

    public addSection = (name: string) => { 
        const newSection = new FormSection(name);
        this._sections.push(newSection);
        return newSection;
    }
    public isValid = () => this._sections.every(section => section.isValid());
    public getValues = () => this._sections.map(section => section.getValues()).flat();
    get sections() { return this._sections; }
}

type FormFieldValidator = RegExp | ((value: string) => boolean);

class FormSection {
    private _name: string;
    private _fields: FormField[] = [];

    constructor(name: string) {
        this._name = name;
    }

    public addField = (
        name: string,
        placeholder: string,
        validator: FormFieldValidator,
        required: boolean = false
    ) => { 
        const newField = new FormField(name, placeholder, validator, required);
        this._fields.push(newField);
        return newField;
    }
    public isValid = () => this._fields.every(field => field.isValid());
    public getValues = () => this._fields.map(field => {
        const valueDictionary: { [fieldName: string]: string } = {};
        valueDictionary[field.name] = field.value;
        return valueDictionary;
    })
    get fields() { return this._fields; }
}

class FormField {

    private _name: string;
    private _placeholder: string;
    private _validator: FormFieldValidator;
    private _required: boolean;
    private _value: string = "";

    constructor(name: string,
        placeholder: string,
        validator: FormFieldValidator,
        required: boolean = false) {

        this._name = name;
        this._placeholder = placeholder;
        this._validator = validator;
        this._required = required;
    }

    public isValid = () => {
        if (this._required && !this.value) { 
            return false;
        }
        if (typeof (this._validator) === 'function') {
            return this._validator(this.value);
        }
        else {
            return (this._validator as RegExp).test(this.value.toString());
        }
    }

    // /return `The field ${this._placeholder} is required and therefore cannot be empty.`;

    get name() { return this._name; };

    get value() { return this._value; };
    set value(newValue: string) { this._value = newValue; };
}