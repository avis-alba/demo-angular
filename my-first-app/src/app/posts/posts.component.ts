import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  constructor(
    private auth: AuthService,
    private router: Router) {

      auth.isAuthDynamic.subscribe((isAuth) => {
        if (!isAuth) this.router.navigate(['/login']);
      });
    }
}
