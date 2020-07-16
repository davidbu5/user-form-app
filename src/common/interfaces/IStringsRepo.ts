export interface IStringsRepo {
    form: {
        sectionNames: {
            personal: string;
            address: string;
            contactability: string;
        },
        fieldsPlaceholdersBySections: {
            personal: {
                firstName: string;
                lastName: string;
                title: string;
            };
            address: {
                country: string;
                city: string;
                street: string;
            };
            contactability: {
                email: string;
                phone: string;
                optin: string;
            };
        }
        errorMessage: {
            requiredEmpty: string;
            invalidEmail: string;
            invalidPhone: string;
        };
        back: string;
        next: string;
        submit: string;
        successMessage: string;
    };
}
