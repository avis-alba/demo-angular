import { Component } from '@angular/core';

@Component({
  selector: 'app-post2',
  templateUrl: './post2.component.html',
  styleUrls: ['./post2.component.scss']
})
export class Post2Component {

  user = {
    name: 'Valentina',
    tech: 'Angular',
  };
  date = new Date();
  img = 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg';

  constructor() {
    setTimeout(() => {
      this.img = 'https://icones.pro/wp-content/uploads/2022/07/icone-angulaire-bleu.png'
    }, 5000);
  }
}
