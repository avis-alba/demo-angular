import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetService} from 'src/app/services/budget.service';
import { incomeData, outcomeData } from 'src/app/utils/budget-data';
import { BudgetPoint, ChartPointData, PointData, PointFullData, TableData } from 'src/app/utils/types';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {

    public incomeTable: TableData;
    public outcomeTable: TableData;

    private _incomeBudget: BudgetService;
    private _outcomeBudget: BudgetService;

    public incomeChartData: ChartPointData[] = [];
    public outcomeChartData: ChartPointData[] = [];
    
    constructor(
      public dialog: MatDialog){

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
        dataSource: this._outcomeBudget.collection, 
        total: this._outcomeBudget.total
      };
    }

    public prepareChartData(tableName: string) {
      if (tableName === 'Доход') {
        console.log('prepareData income')
        const pointsToDisplay: BudgetPoint[] = this._incomeBudget.getCheckedPoints();
        this.incomeChartData = [];

        for (let point of pointsToDisplay) {
          this.incomeChartData.push({
            name: point.item.title, 
            data: [point.amount], 
            category: point.category})
        }
      }

      if (tableName === 'Расход') {
        console.log('prepareData outcome')
        const pointsToDisplay: BudgetPoint[] = this._outcomeBudget.getCheckedPoints();
        this.outcomeChartData = [];
        
        for (let point of pointsToDisplay) {
          this.outcomeChartData.push({
            name: point.item.title, 
            data: [point.amount], 
            category: point.category})
        }
      }
    }

    public deletePoint(pointData: PointData): void {

      const dialogRef = this.dialog.open(DeleteConfirmationComponent);

      dialogRef.afterClosed().subscribe(isConfirmed => {

        if (!isConfirmed) return;

        if (pointData.tableName === 'Доход') {
  
          this._incomeBudget.deletePoint(pointData.index);
          this.incomeTable.dataSource = this._incomeBudget.collection;
          this.incomeTable.total = this._incomeBudget.total;
        }

        if (pointData.tableName === 'Расход') {
  
          this._outcomeBudget.deletePoint(pointData.index);
          this.outcomeTable.dataSource = this._outcomeBudget.collection;
          this.outcomeTable.total = this._outcomeBudget.total;
        } 
      });  
    }

    public addPoint(newPointData: PointFullData): void {

      if (newPointData.tableName === 'Доход') {

        this._incomeBudget.addPoint(newPointData.point);
        this.incomeTable.total = this._incomeBudget.total;
      }

      if (newPointData.tableName === 'Расход') {

        this._outcomeBudget.addPoint(newPointData.point);
        this.outcomeTable.total = this._outcomeBudget.total;
      }
    }

    public editPoint(editedPointData: PointData): void {

      const pointIndex = editedPointData.index;

      if (editedPointData.tableName === 'Доход') {

        const pointData = this.incomeTable.dataSource[pointIndex];

        this._incomeBudget.editPoint(pointIndex, pointData);
        this.incomeTable.total = this._incomeBudget.total;
      }

      if (editedPointData.tableName === 'Расход') {

        const pointData = this.outcomeTable.dataSource[pointIndex];

        this._outcomeBudget.editPoint(pointIndex, pointData);
        this.outcomeTable.total = this._outcomeBudget.total;
      }
    }
}
