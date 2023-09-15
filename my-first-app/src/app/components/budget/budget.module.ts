import { NgModule } from "@angular/core";
import { BudgetComponent } from "./budget.component";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BudgetTableComponent } from "../budget-table/budget-table.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        BudgetComponent,
        BudgetTableComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: BudgetComponent}
        ]),
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        FormsModule
    ]
})
export class BudgetModule {

    constructor(
      private _auth: AuthService,
      private _router: Router) {
            
        _auth.isAuthDynamic.subscribe((isAuth) => {
            if (!isAuth) this._router.navigate(['/login']);
        });
    }

}