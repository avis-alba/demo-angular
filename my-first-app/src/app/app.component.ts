import {Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  private _login: string;

  constructor(public auth: AuthService) { 

    this._login = this.auth.getLogin(document.cookie);
  }

  public ngOnInit(): void {

    if (this._login) {
      this.auth.login(this._login);
    }
  }
}