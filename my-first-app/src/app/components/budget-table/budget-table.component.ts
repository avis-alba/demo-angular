import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PointChangeData, TableData } from 'src/app/utils/types';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent {

  @Input() table: TableData;
  @Output() onDelete: EventEmitter<PointChangeData> = new EventEmitter<PointChangeData>;

  public displayedColumns: string[];

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
  
  public deletePoint(tableName: string, index: number): void {

    this.onDelete.emit({tableName, index});
  }
}
