import { Component } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import { incomeData, outcomeData } from 'src/app/utils/budget-data';
import { TableData } from 'src/app/utils/types';


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
    
    constructor(){

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
        dataSource: 
        this._outcomeBudget.collection, 
        total: this._outcomeBudget.total
      };
      
      this.tables = [this.incomeTable, this.outcomeTable];
    }
}
