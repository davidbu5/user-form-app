
export class AuthStore {

    private authorizationHeader = '';

    getAuthorizationHeader = () => this.authorizationHeader;

    constructor(userName: string, password: string) {
        if (!userName) {
            throw new Error("User name cannot be empty");
        }
        if (!password) {
            throw new Error("Password cannot be empty");
        }

        this.authorizationHeader = `Basic ${btoa(`${userName}:${password}`)}`;
    }
}