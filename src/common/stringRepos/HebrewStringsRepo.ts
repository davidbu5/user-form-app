import { IStringsRepo } from "../interfaces/IStringsRepo";

export const HebrewStringsRepo: IStringsRepo = {
    form: {
        sectionNames: {
            address: "כתובת",
            contactability: "דרכי יצירת קשר",
            personal: "אישי"
        },
        fieldsPlaceholdersBySections: {
            personal: {
                firstName: "שם פרטי",
                lastName: "שם משפחה",
                title: "תפקיד"
            },
            address: {
                country: "מדינה",
                city: "עיר",
                street: "רחוב"
            },
            contactability: {
                email: "אימייל",
                phone: "טלפון",
                optin: "אני מסכימ/ה לקבל דיוור מהחברה"
            }
        },
        errorMessage: {
            requiredEmpty: "השדה הינו שדה נדרש ולכן אינו יכול להיות ריק",
            invalidEmail: "כתובת  האימייל שהוזנה אינה תקינה",
            invalidPhone: "מספר הטלפון שהוזן אינו תקין"
        },
        back: "אחורה",
        next: "קדימה",
        submit: "שליחה",
        successMessage: "הטופס התקבל בהצלחה"
    }
}