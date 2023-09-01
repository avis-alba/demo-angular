import {Component, OnInit} from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthDate: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required])
    });
  }

  public submit():void {

    console.log(this.form.value);
  }

}

