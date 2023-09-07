import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFormService, LoginData } from './auth-form.sevice';
import { MyValidators } from '../reg-form/my.validators';
import { ERROR_MESSAGES } from '../reg-form/reg-form.component';
import { Router } from '@angular/router';
import { AUTH } from '../login';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  errorMessages: { [key: string]: string };
  authErrorMessage: string;

  hidePassword: boolean;
  hideForm: boolean;
  hideError: boolean;

  constructor(
    private formService: AuthFormService,
    private router: Router) {
    
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required, 
        Validators.email, 
        Validators.pattern('^.+@.+\\..+$')]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        MyValidators.passwordRequirements
      ])
    });

    this.email = this.form.get('email');
    this.password = this.form.get('password');

    this.errorMessages = ERROR_MESSAGES;
    this.authErrorMessage = 'Не удалось авторизоваться, попробуйте снова!'

    this.hidePassword = true;
    this.hideForm = false;
    this.hideError = true;
  }

  public submit():void {

    const {email, password} = this.form.value;

    const loginData: LoginData = {
      email,
      password
    }

    this.formService.login(loginData)
      .subscribe({
        next: user => {

          this.hideForm = true;
          document.cookie = `login=${user.email};samesite=lax`;
          
          setTimeout(() => {
            this.router.navigate(['/posts']);
            AUTH.next(document.cookie);
          }, 500);
          
        },
        error: error => {
          console.log(error);
          this.hideError = false;
        }
    });
  }
}
