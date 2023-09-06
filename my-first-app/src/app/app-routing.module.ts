import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegFormComponent } from "./reg-form/reg-form.component";
import { AuthFormComponent } from "./auth-form/auth-form.component";
import { PostsComponent } from "./posts/posts.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
    {path: '', component: AuthFormComponent},
    {path: 'registration', component: RegFormComponent},
    // {path: 'login', component: AuthFormComponent},
    {path: 'posts', component: PostsComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}