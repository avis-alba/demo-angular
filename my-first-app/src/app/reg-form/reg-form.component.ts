import {Component, OnInit} from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDateFormats } from '@angular/material/core';
import { MyValidators } from './my.validators';
import { RegFormService, User } from './reg-form.service';

@Component({
  selector: 'reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent {
  
  form: FormGroup;
  name: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  birthDate: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;

  errorMessages: { [key: string]: string };

  minDate: Date;
  maxDate: Date;

  hidePassword: boolean;
  hidePasswordConfirmation: boolean;
  hideForm: boolean; //temporary
  
	constructor(private formService: RegFormService) {

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

    this.errorMessages = {
      required: 'Поле обязательно для заполнения',
      maxLength: 'не может быть длинее 50 символов',
      minLength: 'не может быть короче 8 символов',
      allowedChar: 'может содержать только буквы, цифры, пробелы и символы .,-\'()',
      notAllowedChar: 'не может содержать только символы или пробелы',
      notAllowedEnding: 'не может начинаться/заканчиваться символом или пробелом',
      dateFormat: 'Введите дату в формате ДД.ММ.ГГГГ',
      minDate: 'Введите дату не ранее 01.01.1900',
      maxDate: 'Вам должно быть не менее 18 лет',
      emailFormat: 'Введите email в формате inbox@mail.com',
      passwordMatch: 'Пароли не совпадают, повторите ввод',
    };

    this.minDate = new Date('1900-01-01');
    this.maxDate = new Date(this.getMaxDate(new Date()));

    this.hidePassword = true;
    this.hidePasswordConfirmation = true;
    this.hideForm = false;
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
        next: res => {
          console.log(res);
          this.hideForm = true;
        },
        error: error => console.log(error)
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

