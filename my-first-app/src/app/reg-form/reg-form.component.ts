import {Component, OnInit} from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDateFormats } from '@angular/material/core';
import { MyValidators } from './my.validators';
import { RegFormService, User } from './reg-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit{
  
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
  
	constructor(
    private formService: RegFormService,
    private router: Router) {

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
    this.maxDate = new Date(this.getMaxDate(new Date()));

    this.hidePassword = true;
    this.hidePasswordConfirmation = true;
    this.hideForm = false;
    this.hideError = true;

    this.errorMessages = ERROR_MESSAGES;
  }

  public ngOnInit(): void {

    this.name.setValue('Анатолий');
    this.lastName.setValue('Анатольев');
    this.email.setValue('my-email@mail.ru');
    this.birthDate.setValue('2001-11-11');
    this.password.setValue('Qwerty1!');
    this.confirmPassword.setValue('Qwerty1!');
  }

  private getMaxDate(currentDate: Date): string {

    let day: string | number = currentDate.getDate();
    let month: string | number = currentDate.getMonth() + 1;
    let year: string | number = currentDate.getFullYear() - 18;

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${year}-${month}-${day}`;
  }

  public submit():void {

    const {name, lastName, email, birthDate, password} = this.form.value;

    const user: User = {
      name,
      lastName,
      email,
      birthDate: birthDate._d,
      password
    }

    this.formService.createUser(user)
      .subscribe({
        next: () => {
          
          this.hideForm = true;
          this.submitMessage = 'Успешная регистрация';
          setTimeout(() => {this.router.navigate(['/'])}, 500);
        },
        error: (error) => {

          console.log(error);
          this.hideError = false;
          this.submitMessage = 'Что-то пошло не так, попробуйте снова';
        }
      });
  }
}

export const MOMENT_DATE_FORMATS: MatDateFormats = {
  parse: {
      dateInput: 'DD.MM.YYYY',
  },
  display: {
      dateInput: 'DD.MM.YYYY',
      monthYearLabel: 'MMMM Y',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM Y'
  }
};

export const ERROR_MESSAGES: { [key: string]: string } = {
  required: 'Поле обязательно для заполнения',
  maxLength: 'не может быть длинее 50 символов',
  minLength: 'не может быть короче 8 символов',
  maxLengthPost: 'не может быть длинее 500 символов',
  minLengthPost: 'не может быть короче 100 символов',
  maxLengthTitle: 'не может быть длинее 100 символов',
  minLengthTitle: 'не может быть короче 10 символов',
  allowedChar: 'может содержать только буквы, цифры, пробелы и символы .,-\'()',
  notAllowedChar: 'не может содержать только символы или пробелы',
  notAllowedEnding: 'не может начинаться/заканчиваться символом или пробелом',
  dateFormat: 'Введите дату в формате ДД.ММ.ГГГГ',
  minDate: 'Введите дату не ранее 01.01.1900',
  maxDate: 'Вам должно быть не менее 18 лет',
  emailFormat: 'Введите email в формате inbox@mail.com',
  passwordMatch: 'Пароли не совпадают, повторите ввод',
};
