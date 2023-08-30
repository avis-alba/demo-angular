import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Test project';
  number = 1001;

  inputValue = '';

  onInput(event: Event) {
    console.log('Event', event);

      this.inputValue = (<HTMLInputElement>event.target).value;
  }

  onClick() {
    alert('Click');
  }

  onBlur(str: string) {
    this.inputValue = str;
  }
}
