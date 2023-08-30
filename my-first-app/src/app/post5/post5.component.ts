import { Component } from '@angular/core';

@Component({
  selector: 'app-post5',
  templateUrl: './post5.component.html',
  styleUrls: ['./post5.component.scss']
})
export class Post5Component {
  
  title = 'Initilal';
  title2 = 'Initial2';

  backgroundToggle = false;
  toggle = false;

  onInput(event: any) {
    this.title = event.target.value;
  }
}
