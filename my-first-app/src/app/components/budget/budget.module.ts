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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { BudgetFormComponent } from "../budget-form/budget-form.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BudgetChartComponent } from "../budget-chart/budget-chart.component";
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        BudgetComponent,
        BudgetTableComponent,
        BudgetFormComponent,
        BudgetChartComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: '', component: BudgetComponent}
        ]),
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        DragDropModule
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