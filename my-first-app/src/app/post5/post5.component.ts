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
  toggle: boolean | string = false;

  now: Date = new Date();

  arr = ['A', 'B', 'C','D', 'E', 'F', 'G'];
  objs = [
    {title: 'Post 1', author: 'Valentina', comments: [
      {name: 'Max', text: 'Lorem 1'},
      {name: 'Max', text: 'Lorem 2'},
      {name: 'Max', text: 'Lorem 3'},
    ]},
    {title: 'Post 2', author: 'Valentina M', comments: [
      {name: 'Man', text: 'Lorem 1'},
      {name: 'Man', text: 'Lorem 2'},
      {name: 'Man', text: 'Lorem 3'},
    ]}
  ]

  onInput(event: any) {
    this.title = event.target.value;
  }
}
