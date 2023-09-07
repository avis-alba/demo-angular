import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private auth: AuthService,
    private router: Router) {

      auth.isAuthDynamic.subscribe((isAuth) => {
        if (!isAuth) this.router.navigate(['/login']);
      });
    }
}
