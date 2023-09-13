import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegFormComponent } from "./components/reg-form/reg-form.component";
import { AuthFormComponent } from "./components/auth-form/auth-form.component";
import { PostsComponent } from "./components/posts/posts.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard} from "./guards/auth.guard";
import { NoAuthGuard } from "./guards/no-auth.guard";
import { HomeGuard } from "./guards/home.guard";

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [HomeGuard]},
    {path: 'registration', component: RegFormComponent, canActivate: [NoAuthGuard]},
    {path: 'login', component: AuthFormComponent, canActivate: [NoAuthGuard]},
    {path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
    {path: 'budget', loadChildren: () => import('./components/budget/budget.module').then(m => m.BudgetModule)},
    {path: '404', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/404'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}