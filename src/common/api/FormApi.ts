import { FormFieldValueType } from "../stores/FormStore";

export class FormApi {

    public static async getCountriesNames(): Promise<string[]> {
        return fetch("http://localhost:3000/countriesNames")
            .then(response => response.json())
    }

    public static async submitForm(formValues: { [key: string]: FormFieldValueType }[]): Promise<boolean> {
        const combinedFormValues = formValues.reduce((combined, value) => Object.assign(combined, value), {})
        return fetch("http://localhost:3000/user", {
            method: "post", body: JSON.stringify(combinedFormValues), headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(v => { console.log(v); return v; })
            .then(res => res === true ? true : false)
    }
}