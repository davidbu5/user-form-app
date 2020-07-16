import { threadId } from "worker_threads";

export class FormFactory {

    public static create() {
        return new Form();
    }
}

class Form {

    private _sections: FormSection[] = [];

    public addSection = (section: FormSection) => this._sections.push(section);
    public isValid = () => this._sections.every(section => section.isValid());
    public getValues = () => this._sections.map(section => section.getValues()).flat();
}

class FormSection {
    private _name: string;
    private _fields: FormField[] = [];

    constructor(name: string) {
        this._name = name;
    }

    public isValid = () => this._fields.every(field => field.isValid());
    public getValues = () => this._fields.map(field => {
        const valueDictionary: { [fieldName: string]: string } = {};
        valueDictionary[field.name] = field.value;
        return valueDictionary;
    })
}

class FormField {
    
    private _name: string;
    private _placeholder: string;
    private _validator: RegExp;
    private _required: boolean;
    private _value: string = "";

    constructor(name: string,
        placeholder: string,
        validator: RegExp,
        required: boolean = false) {
                
        this._name = name;
        this._placeholder = placeholder;
        this._validator = validator;
        this._required = required;
    }

    public isValid = () => this._validator.test(this._value.toString());

    get name() { return this._name; };

    get value() { return this._value; };
    set value(newValue: string) { this._value = newValue; };
}