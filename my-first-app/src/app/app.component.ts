import {Component, OnInit} from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  private login: string;

  constructor(public auth: AuthService) { 

    this.login = this.auth.getLogin(document.cookie);
  }

  public ngOnInit(): void {

    if (this.login) {
      this.auth.login(this.login);
    }
  }
}