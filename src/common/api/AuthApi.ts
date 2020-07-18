import { AuthStore } from "../stores/AuthStore";

export class AuthApi {

    public static async authenticate(authStore: AuthStore): Promise<boolean> {
        const headers = new Headers();
        const authHeader = authStore.getAuthorizationHeader();
        headers.append('Authorization', authHeader);
        return fetch("http://localhost:3001/login", { headers })
            .then(response => response.json())
    }

}