import { Component } from '@angular/core';
import { incomeData, outcomeData } from 'src/app/utils/budget-data';
import { TableData } from 'src/app/utils/types';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {

    public tables: TableData[];
    
    constructor() {
      
      this.tables = [
        {name: 'Доход', dataSource: incomeData},
        {name: 'Расход', dataSource: outcomeData}
      ]
    }
}
