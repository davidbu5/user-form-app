import { FormFieldValueType } from "../stores/FormStore";
import { ObservedAuthStore } from "../stores/AuthStore";

export class AuthApi {

    public static async authenticate(authStore: ObservedAuthStore): Promise<boolean> {
        const headers = new Headers();
        const authHeader = authStore.getAuthorizationHeader();
        headers.append('Authorization', authHeader);
        return fetch("http://localhost:3001/login", { headers })
            .then(response => response.json())
    }

}