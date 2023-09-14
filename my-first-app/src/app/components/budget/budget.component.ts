import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {
  
    public displayedColumns: string[] = ['check', 'category', 'item', 'amount', 'percent', 'tools'];
    public incomeData: any[] = [{1: 'd'}, {2: 'f'}];
    public outcomeData: any[] = [1, 2, 3, 4, 5];

    @ViewChild(MatTable) incomeTable: MatTable<any>;
    @ViewChild(MatTable) outcomeTable: MatTable<any>;

    constructor() {
      
    }
}
