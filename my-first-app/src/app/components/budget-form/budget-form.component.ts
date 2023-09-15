import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BUDGET_CATEGORIES, ERROR_MESSAGES } from 'src/app/utils/const';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss']
})
export class BudgetFormComponent {
  
  public form: FormGroup;
  public title: AbstractControl;
  public description: AbstractControl;
  public category: AbstractControl;
  public amount: AbstractControl;
  public errorMessages: {[key: string]: string};
  public categories: string[];
  
  constructor(
    public dialogRef: MatDialogRef<BudgetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tableName: string }
  ) {
    
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required, 
        Validators.maxLength(100)]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(500)]),
      category: new FormControl(null, [
        Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.min(1)])
    });

    this.title = this.form.get('title');
    this.description = this.form.get('description');
    this.category = this.form.get('category');
    this.amount = this.form.get('amount');

    this.errorMessages = ERROR_MESSAGES;

    if (this.data.tableName === 'Доход') this.categories = BUDGET_CATEGORIES.income;
    if (this.data.tableName === 'Расход') this.categories = BUDGET_CATEGORIES.outcome;

  }

  public submit() {
    this.dialogRef.close(this.form.value);
  }

  public cancel() {
    this.dialogRef.close();
  }
}
