import {Component, OnInit} from '@angular/core'
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDateFormats } from '@angular/material/core';
import { MyValidators } from './my.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  form: FormGroup;
  name: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  birthDate: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;

  minDate: Date;
  maxDate: Date;

  hidePassword: boolean;
  hidePasswordConfirmation: boolean;
  
	constructor() {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern('^[A-Za-zА-Яа-яЁё0-9.,\\(\\)\\s\'\\-]+$'), MyValidators.stringEdgesCheck]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern('^[A-Za-zА-Яа-яЁё0-9.,\\(\\)\\s\'\\-]+$'), MyValidators.stringEdgesCheck]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^.+@.+\\..+$')]),
      birthDate: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), MyValidators.passwordRequirements, MyValidators.passwordChange]),
      confirmPassword: new FormControl(null, [Validators.required, MyValidators.passwordConfirmation])
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

    console.log(this.form.value);
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

