import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class MyValidators {

    passwordConfirmation: ValidatorFn;

    public static passwordConfirmation(control: FormControl): ValidationErrors {

        if (control.root.value) {

            const password = control.root.value.password;
            const confirmPassword = control.value;

            if (confirmPassword !== password) {
    
                return {passwordMatch: true}
            } 
        }
        
        return null;
    }
}