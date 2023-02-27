import { AbstractControl, ValidatorFn } from '@angular/forms';


export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
        const isValid = passwordRegex.test(control.value);
        return isValid ? null : { 'invalidPassword': { value: control.value } };
    };

};


