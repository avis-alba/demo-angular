import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegFormComponent } from "./reg-form/reg-form.component";
import { AuthFormComponent } from "./auth-form/auth-form.component";
import { PostsComponent } from "./posts/posts.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'registration', component: RegFormComponent},
    {path: 'login', component: AuthFormComponent},
    {path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
    {path: '404', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/404'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}