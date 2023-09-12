import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class MyValidators {

    stringEdgesCheck: ValidatorFn;
    passwordConfirmation: ValidatorFn;
    passwordRequirements: ValidatorFn;
    passwordChange: ValidatorFn;

    public static stringEdgesCheck(control: FormControl): ValidationErrors {

        const value: string = control.value;
        if (!value) return null;

        if (!value.match(/[A-Za-zА-Яа-яЁё0-9]+/) && value.match(/^[A-Za-zА-Яа-яЁё0-9.,()\s'-]+/)) {

            return { stringContent: true };

        } else if (value.match(/^[\s'.,)-]/) || value.match(/[\s'.,(-]$/)) {

            return { stringEdges: true };
        }

        return null;
    }

    public static passwordConfirmation(control: FormControl): ValidationErrors {

        if (!control.value) return null;
        
        const password: string = control.root.get('password').value;
        const confirmPassword: string = control.value;

        if (confirmPassword !== password) {
    
            return { passwordMatch: true };
        }

        return null;
    }

    public static passwordRequirements(control: FormControl): ValidationErrors {

        const password: string = control.value;
        if (!password) return null;

        const numOk: boolean = Boolean(password.match(/\d+/));
        const lowercaseLetterOk: boolean = Boolean(password.match(/[a-zа-яё]+/));
        const uppercaseLetterOk: boolean = Boolean(password.match(/[A-ZА-ЯЁ]+/));
        const symbolOk: boolean = Boolean(password.match(/[`!@#№$%^&*()_=+[\]{}:;"\\|,./<>?~'-]+/));

        if (numOk && lowercaseLetterOk && uppercaseLetterOk && symbolOk) {

            return null;

        } else {

            return {

                requiredValue: true,
                requiredNumber: !numOk,
                requiredLowercaseLetter: !lowercaseLetterOk,
                requiredUppercaseLetter: !uppercaseLetterOk,
                requiredSymbol: !symbolOk
            }
        }
    }

    public static passwordChange(control: FormControl): ValidationErrors {

        if (!control.value) return null;

        const confirmPassword: AbstractControl = control.root.get('confirmPassword');

        if (confirmPassword.touched) {

            if (control.value !== confirmPassword.value) {

                confirmPassword.setErrors({ passwordMatch: true });

            } else {
                 
                confirmPassword.updateValueAndValidity();
            }
        }

        return null;
    }
}