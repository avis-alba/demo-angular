import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostForm } from '../posts/posts.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ERROR_MESSAGES } from '../reg-form/reg-form.component';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {

  public form: FormGroup;
  public title: AbstractControl;
  public body: AbstractControl;
  public errorMessages: {[key: string]: string};

  constructor(
    public dialogRef: MatDialogRef<PostFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostForm
  ) {

    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required, 
        Validators.maxLength(100)]),
      body: new FormControl(null, [
        Validators.required,
        Validators.maxLength(500)])
    });

    this.title = this.form.get('title');
    this.body = this.form.get('body');

    this.dialogRef.afterOpened().subscribe(() => {
      this.title.setValue(data.title);
      this.body.setValue(data.body);
    });

    this.errorMessages = ERROR_MESSAGES;
  }

  public submit(): void {
    this.dialogRef.close(this.form.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
