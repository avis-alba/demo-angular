import {Component} from '@angular/core';
import { AUTH } from './login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  login: string;

  constructor() {

    this.login = this.getLogin(document.cookie);
    
    AUTH.subscribe((cookies) => {
      this.login = this.getLogin(cookies);
    });

  }
  
  public getLogin(cookies: string): string {
    
    const cookiesArr = cookies.split(';');
    let login: string = '';
    
    for (let cookie of cookiesArr) {
      
      const cookieSplit = cookie.split('=');
      
      if (cookieSplit[0] === 'login') {

        login = cookieSplit[1];
      } 
    }

    return login;
  }

  public logout():void {

    document.cookie = 'login=;samesite=lax;max-age=0';
    AUTH.next(document.cookie);
  }
}
