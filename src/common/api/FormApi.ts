import { FormFieldValueType } from "../stores/FormStore";

export class FormApi {

    public static async getCountriesNames() {
        return ["Israel", "USA", "Poland", "Morroco"];
    }

    public static async submitForm(formValues: { [key: string]: FormFieldValueType }) {
        return true;
    }
}