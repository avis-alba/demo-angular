import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetPoint, PointData, PointFullData, TableData } from 'src/app/utils/types';
import { BudgetFormComponent } from '../budget-form/budget-form.component';
import { MatTable } from '@angular/material/table';
import { BUDGET_CATEGORIES } from 'src/app/utils/const';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetTableComponent{

  public displayedColumns: string[];
  public categories: string[];

  public isOnEditIndex: number;
  public isOnEditTable: string;
  public isEditValid: boolean;

  public amountValue: number;
  public titleValue: string;
  public descriptionValue: string;

  public chartId: string;

  public data: {name: string, data: [number], category?: string}[] = [];

  @ViewChild(MatTable) matTable: MatTable<BudgetPoint>;

  @Input() table: TableData;
  @Output() onDelete: EventEmitter<PointData> = new EventEmitter<PointData>;
  @Output() onEdit: EventEmitter<PointData> = new EventEmitter<PointData>;
  @Output() onAdd: EventEmitter<PointFullData> = new EventEmitter<PointFullData>;


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

  ngOnInit(): void {

    if (this.table.name === 'Доход') {
      this.chartId = 'column-chart-income';
    }
    
    if (this.table.name === 'Расход') {
      this.chartId = 'column-chart-outcome';
    }
  }
  
  ngAfterViewInit(): void {

    for (let point of this.table.dataSource) {
      this.data.push({name: point.item.title, data: [point.amount], category: point.category});
    }

    this.displayChart(this.data, this.chartId);
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
    this.onEdit.emit({tableName, index});
  }

  public deletePoint(tableName: string, index: number): void {

    if (this.isOnEditIndex !== -1) {
      this.savePoint(this.isOnEditTable, this.isOnEditIndex);
    }
    
    this.isOnEditIndex = -1;
  
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

  public displayChart(data: any[], id: string): void {

    let name: string;

    if (id.includes('income')) {
      name = 'Доход'
    }
    if (id.includes('outcome')) {
      name = 'Расход'
    } 

    Highcharts.chart(id, {
      chart: {
          type: 'column',
          zooming: {
            mouseWheel: {
              enabled: false
            }
          }
      },
      title: {
          text: name
      },
      subtitle: {
          text: 'для выбранных позиций'
      },
      xAxis: {
          categories: [],
          labels: {
            enabled: false
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Сумма (₽)'
          },
      },
      legend: {
        enabled: true,
        alignColumns: false
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          },
          series: {
            showInLegend: true,
            dataLabels: {
              enabled: false,
            },
            tooltip: {
              headerFormat: ``,
              pointFormatter: function() {
                const name = this.series.userOptions.name;
                const category = data.find(v => v.name === name).category;
                const value = data.find(v => v.name === name).data[0];
                return `${category}: <span style="font-weight: bold">${this.series.userOptions.name}</span> <strong style="color: ${this.series.color}">${value}</strong>`
              }
            }
          },
      },
      accessibility: {
        enabled: false
      },
      series: data
    });
  }
}
