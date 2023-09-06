import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegFormComponent } from "./reg-form/reg-form.component";
import { AuthFormComponent } from "./auth-form/auth-form.component";
import { PostsComponent } from "./posts/posts.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'registration', component: RegFormComponent},
    {path: 'login', component: AuthFormComponent},
    {path: 'posts', component: PostsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}