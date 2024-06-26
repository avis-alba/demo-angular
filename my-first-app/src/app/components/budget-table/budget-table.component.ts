import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetPoint, PointData, PointFullData, TableData } from 'src/app/utils/types';
import { BudgetFormComponent } from '../budget-form/budget-form.component';
import { MatTable } from '@angular/material/table';
import { BUDGET_CATEGORIES } from 'src/app/utils/const';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetTableComponent implements OnChanges {

  public displayedColumns: string[];
  public categories: string[];

  public isOnEditIndex: number;
  public isOnEditChecked: boolean;
  public isOnEditTable: string;
  public isEditValid: boolean;

  public amountValue: number;
  public titleValue: string;
  public descriptionValue: string;

  @ViewChild(MatTable) matTable: MatTable<BudgetPoint>;
  @ViewChildren('deleteButton', { read: ElementRef }) deleteButtons: QueryList<ElementRef>;

  @Input() table: TableData;
  @Output() onDelete: EventEmitter<PointData> = new EventEmitter<PointData>;
  @Output() onEdit: EventEmitter<PointData> = new EventEmitter<PointData>;
  @Output() onAdd: EventEmitter<PointFullData> = new EventEmitter<PointFullData>;
  @Output() onCheck: EventEmitter<string> = new EventEmitter<string>;

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

    this.isOnEditIndex = -1;
    this.isEditValid = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['table'].firstChange) return;
    
    if (this.isOnEditChecked) {   
      this.updateCheck(changes['table'].currentValue.name);
    }
  }

  public updateCheck(tableName: string) {
    this.onCheck.emit(tableName);
  }

  public addPoint(tableName: string) {

    if (this.isOnEditIndex !== -1) {
      this.savePoint(this.isOnEditTable, this.isOnEditIndex);
    }
    
    this.isOnEditIndex = -1;
    this.isOnEditTable = '';
    
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
      this.matTable.renderRows();
    });
  }

  public editPoint(tableName: string, index: number): void {

    if (this.isOnEditIndex !== -1) {
      this.savePoint(this.isOnEditTable, this.isOnEditIndex);
    }

    this.isOnEditIndex = index;
    this.isOnEditTable = tableName;
    
    if (tableName === 'Доход') {
      this.categories = BUDGET_CATEGORIES.income;
    }
    
    if (tableName === 'Расход') {
      this.categories = BUDGET_CATEGORIES.outcome;
    }
  }
  
  public savePoint(tableName: string, index: number): void {
    
    this.isOnEditIndex = -1;
    this.isOnEditTable = '';
    this.isOnEditChecked = this.table.dataSource[index].check;

    this.onEdit.emit({tableName, index});
  }

  public deletePoint(tableName: string, index: number): void {

    if (this.isOnEditIndex !== -1) {
      this.savePoint(this.isOnEditTable, this.isOnEditIndex);
    }
    
    this.isOnEditChecked = this.table.dataSource[index].check;
    
    this.onDelete.emit({tableName, index});
  }

  public onInputAmount(value: string): void {
    this.amountValue = +value;

    if (this.amountValue <= 0) {
      this.isEditValid = false;

    } else {
      this.isEditValid = true;
    }
  }

  public onInputTitle(value: string): void {
    this.titleValue = value;

    if (!this.titleValue) {
      this.isEditValid = false;

    } else {
      this.isEditValid = true;
    }
  }

  public onInputDescription(value: string): void {
    this.descriptionValue = value;

    if (!this.descriptionValue) {
      this.isEditValid = false;

    } else {
      this.isEditValid = true;
    }
  }
}
