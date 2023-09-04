import {Component, OnInit} from '@angular/core'
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms'

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

  constructor() {
    
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthDate: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required])
    });

    this.name = this.form.get('name');
    this.lastName = this.form.get('lastName');
    this.email = this.form.get('email');
    this.birthDate = this.form.get('birthDate');
    this.password = this.form.get('password');
    this.confirmPassword = this.form.get('confirmPassword');
  }

  public submit():void {

    console.log(this.form.value);
  }

}

