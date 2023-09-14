import { Component, Injectable } from '@angular/core';

let tableNum: number = 0;

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
@Injectable({providedIn: 'root'})
export class BudgetTableComponent {

  public displayedColumns: string[] = ['check', 'category', 'item', 'amount', 'percent', 'tools'];
  public dataSource: any[];
  public tableName: string;

  constructor() {
    if (!tableNum) {

      this.dataSource = [1,2];
      this.tableName = 'Доход';
      tableNum++;

    } else {

      this.dataSource = [1,2,3,4,5,6];
      this.tableName = 'Расход';
      tableNum = 0;
    }
  }
}
