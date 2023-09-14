import { Component } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import { incomeData, outcomeData } from 'src/app/utils/budget-data';
import { BudgetPoint, TableData } from 'src/app/utils/types';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {

    public tables: TableData[];
    public incomeData: BudgetPoint[];
    public outcomeData: BudgetPoint[];
    public total: number;
    
    constructor(private _budget: BudgetService) {

      this.incomeData = incomeData;
      this.outcomeData = outcomeData;
      
      this.tables = [
        {name: 'Доход', dataSource: this.incomeData, total: 0},
        {name: 'Расход', dataSource: this.outcomeData, total: 0}
      ];

      for (let table of this.tables) {

        table.total = _budget.getTotal(table.dataSource);

        for (let point of table.dataSource) {

          point.percent = _budget.getPercent(point, table.dataSource);
        }     
      }
    }
}
