import { ChangeDetectorRef, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetService} from 'src/app/services/budget.service';
import { incomeData, outcomeData } from 'src/app/utils/budget-data';
import { BudgetPoint, ChartPointData, PointData, PointFullData, TableData } from 'src/app/utils/types';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { BudgetTableComponent } from '../budget-table/budget-table.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

    public contentBlocks: TableData[];
    public listOrientation: {orientation: any, axis: any} = {orientation: 'horizontal', axis: 'x'};
    public showAlert: boolean = false;

    @ViewChildren(BudgetTableComponent) budgetTables!: QueryList<BudgetTableComponent>;
    @ViewChild('content', { read: ElementRef }) content: ElementRef;

    constructor(
      public dialog: MatDialog,
      private _renderer: Renderer2,
      private _changeDetector: ChangeDetectorRef){

      this._incomeBudget = new BudgetService();
      this._outcomeBudget = new BudgetService();
      
      this._incomeBudget.collection = incomeData;
      this._outcomeBudget.collection = outcomeData;

      this.incomeTable = {
        name: 'Доход', 
        dataSource: this._incomeBudget.collection, 
        total: this._incomeBudget.total,
        chartData: this.incomeChartData,
      };

      this.outcomeTable = {
        name: 'Расход', 
        dataSource: this._outcomeBudget.collection, 
        total: this._outcomeBudget.total,
        chartData: this.outcomeChartData
      };

      this.contentBlocks = [this.incomeTable, this.outcomeTable];

      if (document.documentElement.clientWidth < 1232) {

        this.listOrientation.orientation = 'vertical';
        this.listOrientation.axis = 'y';

      } else {

        this.listOrientation.orientation = 'horizontal';
        this.listOrientation.axis = 'x';
      }

      let width = '';

      window.onresize = (e) => {
        
        if (document.documentElement.clientWidth < 1232) {
          
          if (this.outcomeTable.chartData.length || this.incomeTable.chartData.length) {

            this.showAlert = true;
  
            if (width) {
              this.content.nativeElement.style.width = width + 'px';
            } else {
              width = document.documentElement.clientWidth.toString();
            }
          }

          this.listOrientation.orientation = 'vertical';
          this.listOrientation.axis = 'y';
  
        } else {
          
          width = '';
          this.content.nativeElement.style.width = '';
          this.showAlert = false;
  
          this.listOrientation.orientation = 'horizontal';
          this.listOrientation.axis = 'x';
        }

        this._changeDetector.detectChanges();
      }
    }

    public prepareChartData(tableName: string) {
      if (tableName === 'Доход') {
        const pointsToDisplay: BudgetPoint[] = this._incomeBudget.getCheckedPoints();
        this.incomeChartData = [];

        for (let point of pointsToDisplay) {
          this.incomeChartData.push({
            name: point.item.title, 
            data: [point.amount], 
            category: point.category,
            maxPointWidth: 100})
        }
        this.contentBlocks.find( i => i.name === tableName).chartData = this.incomeChartData;
        if (!this.incomeChartData.length) this.content.nativeElement.style.width = '';
      }

      if (tableName === 'Расход') {
        const pointsToDisplay: BudgetPoint[] = this._outcomeBudget.getCheckedPoints();
        this.outcomeChartData = [];
        
        for (let point of pointsToDisplay) {
          this.outcomeChartData.push({
            name: point.item.title, 
            data: [point.amount], 
            category: point.category,
            maxPointWidth: 100})
        }
        this.contentBlocks.find( i => i.name === tableName).chartData = this.outcomeChartData;
        if (!this.outcomeChartData.length) this.content.nativeElement.style.width = '';
      }
    }

    public deletePoint(pointData: PointData): void {

      const dialogRef = this.dialog.open(DeleteConfirmationComponent);

      dialogRef.afterClosed().subscribe(isConfirmed => {

        if (!isConfirmed) {

          const tableIndex: number = this.contentBlocks.findIndex( i => i.name === pointData.tableName);
          const table = this.budgetTables.get(tableIndex);
          const deleteButton = table.deleteButtons.get(pointData.index).nativeElement;
          this._renderer.removeClass(deleteButton, 'cdk-focused');
          this._renderer.removeClass(deleteButton, 'cdk-program-focused');
          
          return;
        }

        if (pointData.tableName === 'Доход') {
  
          this._incomeBudget.deletePoint(pointData.index);
          
          this.incomeTable = {
            dataSource: this._incomeBudget.collection,
            total: this._incomeBudget.total,
            name: pointData.tableName,
            chartData: this.incomeChartData
          }

          const i = this.contentBlocks.findIndex( i => i.name === pointData.tableName);
          this.contentBlocks[i] = this.incomeTable;
          this._changeDetector.detectChanges();
 
          this.prepareChartData(pointData.tableName);
        }

        if (pointData.tableName === 'Расход') {
  
          this._outcomeBudget.deletePoint(pointData.index);

          this.outcomeTable = {
            dataSource: this._outcomeBudget.collection,
            total: this._outcomeBudget.total,
            name: pointData.tableName,
            chartData: this.outcomeChartData
          }

          const i = this.contentBlocks.findIndex( i => i.name === pointData.tableName);
          this.contentBlocks[i] = this.outcomeTable;
          this._changeDetector.detectChanges();

          this.prepareChartData(pointData.tableName);
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
        this.incomeTable = {
          name: editedPointData.tableName,
          dataSource: this._incomeBudget.collection,
          total: this._incomeBudget.total,
          chartData: this.incomeChartData
        }

        const i = this.contentBlocks.findIndex( i => i.name === editedPointData.tableName);
        this.contentBlocks[i] = this.incomeTable;
        this._changeDetector.detectChanges();

        this.prepareChartData(editedPointData.tableName);
      }

      if (editedPointData.tableName === 'Расход') {

        const pointData = this.outcomeTable.dataSource[pointIndex];

        this._outcomeBudget.editPoint(pointIndex, pointData);
        this.outcomeTable = {
          name: editedPointData.tableName,
          dataSource: this._outcomeBudget.collection,
          total: this._outcomeBudget.total,
          chartData: this.outcomeChartData
        }

        const i = this.contentBlocks.findIndex( i => i.name === editedPointData.tableName);
        this.contentBlocks[i] = this.outcomeTable;
        this._changeDetector.detectChanges();
        
        this.prepareChartData(editedPointData.tableName);
      }
    }

    public drop(event: CdkDragDrop<any>) {
      moveItemInArray(this.contentBlocks, event.previousIndex, event.currentIndex);
    }
}
