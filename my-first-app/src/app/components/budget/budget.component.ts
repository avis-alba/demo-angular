import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetService } from 'src/app/services/budget.service';
import { incomeData, outcomeData } from 'src/app/utils/budget-data';
import { TableData } from 'src/app/utils/types';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {

    public tables: TableData[];

    public incomeTable: TableData;
    public outcomeTable: TableData;

    private _incomeBudget: BudgetService;
    private _outcomeBudget: BudgetService;
    
    constructor(
      public dialog: MatDialog){

      this._incomeBudget = new BudgetService();
      this._outcomeBudget = new BudgetService();
      
      this._incomeBudget.collection = incomeData;
      this._outcomeBudget.collection = outcomeData;

      this.incomeTable = {
        name: 'Доход', 
        dataSource: this._incomeBudget.collection, 
        total: this._incomeBudget.total
      };

      this.outcomeTable = {
        name: 'Расход', 
        dataSource: this._outcomeBudget.collection, 
        total: this._outcomeBudget.total
      };
      
      this.tables = [this.incomeTable, this.outcomeTable];
    }

    public showChecked(num: number): void {
      if (!num) console.log('Доход:', this._incomeBudget.getCheckedPoints());
      if (num) console.log('Расход:', this._outcomeBudget.getCheckedPoints());
    }

    public deletePoint(pointData: {tableName: string, index: number}): void {

      const dialogRef = this.dialog.open(DeleteConfirmationComponent);

      dialogRef.afterClosed().subscribe(isConfirmed => {

        if (!isConfirmed) return;

        if (pointData.tableName === 'Доход') {
  
          this.incomeTable.dataSource = this._incomeBudget.deletePoint(pointData.index);
          this.incomeTable.total = this._incomeBudget.total;
        }

        if (pointData.tableName === 'Расход') {
  
          this.outcomeTable.dataSource = this._outcomeBudget.deletePoint(pointData.index);
          this.outcomeTable.total = this._outcomeBudget.total;
        } 
      });  
    }
}
