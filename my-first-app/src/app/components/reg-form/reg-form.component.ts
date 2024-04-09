import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './my.validators';
import { RegFormService } from '../../services/reg-form.service';
import { Router } from '@angular/router';
import { User } from 'src/app/utils/types';
import { ERROR_MESSAGES } from 'src/app/utils/const';
import { Subscription } from 'rxjs';

@Component({
  selector: 'reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public name: AbstractControl;
  public lastName: AbstractControl;
  public email: AbstractControl;
  public birthDate: AbstractControl;
  public password: AbstractControl;
  public confirmPassword: AbstractControl;

  public errorMessages: { [key: string]: string };

  public minDate: Date;
  public maxDate: Date;

  public hidePassword: boolean;
  public hidePasswordConfirmation: boolean;
  public hideForm: boolean;
  public hideError: boolean;

  public submitMessage: string;

  public subscriptions: Subscription[] = [];

  constructor(
    private _formService: RegFormService,
    private _router: Router) {

    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[A-Za-zА-Яа-яЁё0-9.,\\(\\)\\s\'\\-]+$'),
        MyValidators.stringEdgesCheck]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[A-Za-zА-Яа-яЁё0-9.,\\(\\)\\s\'\\-]+$'),
        MyValidators.stringEdgesCheck]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^.+@.+\\..+$')]),
      birthDate: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        MyValidators.passwordRequirements,
        MyValidators.passwordChange]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        MyValidators.passwordConfirmation])
    });

    this.name = this.form.get('name');
    this.lastName = this.form.get('lastName');
    this.email = this.form.get('email');
    this.birthDate = this.form.get('birthDate');
    this.password = this.form.get('password');
    this.confirmPassword = this.form.get('confirmPassword');

    this.minDate = new Date('1900-01-01');
    this.maxDate = new Date(this._getMaxDate(new Date()));

    this.hidePassword = true;
    this.hidePasswordConfirmation = true;
    this.hideForm = false;
    this.hideError = true;

    this.errorMessages = ERROR_MESSAGES;
  }

  public ngOnInit(): void {

    // Mock data

    // this.name.setValue('Анатолий');
    // this.lastName.setValue('Анатольев');
    // this.email.setValue('my-email@mail.ru');
    // this.birthDate.setValue('2001-11-11');
    // this.password.setValue('Qwerty1!');
    // this.confirmPassword.setValue('Qwerty1!');
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => { sub.unsubscribe() });
  }

  private _getMaxDate(currentDate: Date): string {

    let day: string | number = currentDate.getDate();
    let month: string | number = currentDate.getMonth() + 1;
    let year: string | number = currentDate.getFullYear() - 18;

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${year}-${month}-${day}`;
  }

  public submit(): void {

    const { name, lastName, email, birthDate, password } = this.form.value;

    const user: User = {
      name,
      lastName,
      email,
      birthDate: birthDate._d,
      password
    }

    this.subscriptions.push(this._formService.createUser(user)
      .subscribe({
        next: () => {

          this.hideForm = true;
          this.submitMessage = 'Успешная регистрация';
          setTimeout(() => { this._router.navigate(['/']) }, 500);
        },
        error: (error) => {

          console.log(error);
          this.hideError = false;
          this.submitMessage = 'Что-то пошло не так, попробуйте снова';
        }
      }));
  }
}