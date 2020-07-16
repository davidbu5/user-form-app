import { IStringsRepo } from "../interfaces/IStringsRepo";

export const EnglishStringsRepo: IStringsRepo = {
    form: {
        sectionNames: {
            personal: "Personal",
            address: "Address",
            contactability: "Contactability"
        },
        fieldsPlaceholdersBySections: {
            personal: {
                firstName: "First Name",
                lastName: "Last Name",
                title: "title"
            },
            address: {
                country: "Country",
                city: "City",
                street: "Street"
            },
            contactability: {
                email: "Email",
                phone: "Phone",
                optin: "I approve receiving info from the company"
            }
        },
        errorMessage: {
            requiredEmpty: "This field is required and therefore cannot be empty",
            invalidEmail: "The Email addres is invalid",
            invalidPhone: "the phone number is invalid"
        },
        back: "Back",
        next: "Next",
        submit: "submit",
        successMessage: "The form had been submitted successfully"
    },
}