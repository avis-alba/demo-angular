import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetPoint, PointData, PointFullData, TableData } from 'src/app/utils/types';
import { BudgetFormComponent } from '../budget-form/budget-form.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent {

  @ViewChild(MatTable) table1: MatTable<BudgetPoint>;

  @Input() table: TableData;
  @Output() onDelete: EventEmitter<PointData> = new EventEmitter<PointData>;
  @Output() onAdd: EventEmitter<PointFullData> = new EventEmitter<PointFullData>;

  public displayedColumns: string[];

  constructor(
    public dialog: MatDialog) {

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

  public addPoint(tableName: string) {
    
    const dialogRef = this.dialog.open(BudgetFormComponent, {
      data: {
        tableName
      }});
    
    dialogRef.afterClosed().subscribe(point => {

      if(!point) return;

      const newBudgetPoint: BudgetPoint = {
        check: false,
        category: point.category,
        item: {title: point.title, description: point.description},
        amount: point.amount,
        percent: 0
      }

      const pointData: PointFullData = {
        tableName: tableName,
        index: 0,
        point: newBudgetPoint
      }

      this.onAdd.emit(pointData);
      this.table1.renderRows();
    });
  }
}
