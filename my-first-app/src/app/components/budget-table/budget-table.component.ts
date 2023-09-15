import { Component, Input } from '@angular/core';
import { TableData } from 'src/app/utils/types';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent {

  @Input() table: TableData;

  public displayedColumns: string[];
  public checked: boolean

  constructor() {

    this.displayedColumns = [
      'check', 
      'category', 
      'item', 
      'amount', 
      'percent', 
      'tools'
    ];
  }  
}
