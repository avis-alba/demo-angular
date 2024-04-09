import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFormService } from '../../services/auth-form.sevice';
import { MyValidators } from '../reg-form/my.validators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginData } from 'src/app/utils/types';
import { ERROR_MESSAGES } from 'src/app/utils/const';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnDestroy {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  public errorMessages: { [key: string]: string };
  public authErrorMessage: string;

  public hidePassword: boolean;
  public hideForm: boolean;
  public hideError: boolean;

  public subscriptions: Subscription[] = [];

  constructor(
    private _formService: AuthFormService,
    private _router: Router,
    private _auth: AuthService) {

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

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => { sub.unsubscribe() });
  }

  public submit(): void {

    const { email, password } = this.form.value;

    const loginData: LoginData = { email, password };

    this.subscriptions.push(this._formService.login(loginData)
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
      }));
  }
}