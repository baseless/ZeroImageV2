import { Control }      from "angular2/common";

export class AppValidators {
    static validateUserName(c: Control) {
        return c.value.match("^[a-f]+$") ? null : { validateUserName: { valid: false } };
    }

    static validatePassword(c: Control) {
        return c.value.match("^[a-zA-Z]\w{8,60}$") ? null : { validatePassword: { valid: false } };
    }
}