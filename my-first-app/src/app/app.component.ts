import {Component} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AUTH, LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  login: string;

  constructor(private loginService: LoginService) {

    this.setLogin(document.cookie);

    // this.loginService.login(AUTH.login)
    //   .subscribe(auth => {
    //     this.login = auth;
    //   })
  }
  
  public setLogin(cookies: string): void {
    
    const cookiesArr = cookies.split(';');
    
    for (let cookie of cookiesArr) {
      
      const cookieSplit = cookie.split('=');
      
      if (cookieSplit[0] === 'login') {
        this.login = cookieSplit[1];
        console.log('set login', this.login);
        break;
      } 
    }
  }

  public logout():void {

    document.cookie = 'login=;samesite=lax;max-age=0';
    this.login = '';
  }
}
