import {Component} from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  login: string;

  constructor(public auth: AuthService) {

    this.login = this.getLogin(document.cookie);
    if (this.login) this.auth.login();

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
    this.login = '';
    this.auth.logout();
  }
}
