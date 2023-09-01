import {Component, OnInit} from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { MyValidators } from './my.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  skills: FormArray;

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email, 
        Validators.required,
        MyValidators.restrictedEmails
      ], MyValidators.uniqueEmail),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      address: new FormGroup({
        country: new FormControl('ru'),
        city: new FormControl('', Validators.required)
      }),
      skills: new FormArray([])
    });

    this.skills = this.form.get('skills') as FormArray;
  }

  setCapital() {

    const cityMap = {
      ru: 'Москва',
      ua: 'Киев',
      by: 'Минск'
    }

    const cityKey: 'ru' | 'ua' | 'by' = this.form.get('address').get('country').value;
    const city = cityMap[cityKey];

    this.form.patchValue({address: {city}});
  }

  addSkill() {

    const control = new FormControl('', Validators.required);
    this.skills.push(control);

    // (this.form.get('skills') as FormArray).push(control);
    // (<FormArray>this.form.get('skills')).push();
  }

  submit() {

    if (this.form.valid) {

      console.log('Form:', this.form);
  
      const formData = {...this.form.value};
      console.log('Form Data:', formData);

      this.form.reset();
    }
  }
}

