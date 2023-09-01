import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'


import {AppComponent} from './app.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
