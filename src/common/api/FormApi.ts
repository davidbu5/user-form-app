import { FormFieldValueType } from "../stores/FormStore";
import { ObservedAuthStore } from "../stores/AuthStore";

export class FormApi {

    public static async getCountriesNames(authStore: ObservedAuthStore): Promise<string[]> {
        const headers = new Headers();
        const authHeader = authStore.getAuthorizationHeader();
        headers.append('Authorization', authHeader);
        return fetch("http://localhost:3001/countriesNames", { headers })
            .then(response => {
                if (response.status !== 200) {
                    console.error(response.body);
                    throw new Error("Loading countries failed");
                }
                return response;
            })
            .then(response => response.json())
    }

    public static async submitForm(authStore: ObservedAuthStore, formValues: { [key: string]: FormFieldValueType }[]): Promise<boolean> {
        const combinedFormValues = formValues.reduce((combined, value) => Object.assign(combined, value), {})
        return fetch("http://localhost:3001/user", {
            method: "post", body: JSON.stringify(combinedFormValues), headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authStore.getAuthorizationHeader()
            },
        })
            .then(response => response.json())
            .then(res => res === true ? true : false)
    }
}