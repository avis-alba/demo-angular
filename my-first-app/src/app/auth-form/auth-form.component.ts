import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFormService, LoginData } from './auth-form.sevice';
import { MyValidators } from '../reg-form/my.validators';
import { ERROR_MESSAGES } from '../reg-form/reg-form.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  public errorMessages: { [key: string]: string };
  public authErrorMessage: string;

  public hidePassword: boolean;
  public hideForm: boolean;
  public hideError: boolean;

  constructor(
    private _formService: AuthFormService,
    private _router: Router,
    private _auth: AuthService) {
    
    this.form = new FormGroup({
      email: new FormControl('my-email@mail.ru', [
        Validators.required, 
        Validators.email, 
        Validators.pattern('^.+@.+\\..+$')]),
      password: new FormControl('Qwerty1!', [
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

    const loginData: LoginData = {email, password};

    this._formService.login(loginData)
      .subscribe({
        next: (user) => {

          this.hideForm = true;
          this._auth.login(user.email);
          
          setTimeout(() => {
            this._router.navigate(['/']);
          }, 500);

        },
        
        error: (error) => {
          console.log(error);
          this.hideError = false;
        }
    });
  }
}
