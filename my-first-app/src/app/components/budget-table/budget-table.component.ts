import { Component, Injectable, Input } from '@angular/core';
import { TableData } from 'src/app/utils/types';

let tableNum: number = 0;

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent {

  @Input() table: TableData;

  public displayedColumns: string[] = ['check', 'category', 'item', 'amount', 'percent', 'tools'];

  constructor() {

  }
}
