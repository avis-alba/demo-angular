import { Injectable } from "@angular/core";
import { BudgetPoint } from "../utils/types";

@Injectable({providedIn: 'root'})
export class BudgetService {

    constructor() {}

    public getTotal(data: BudgetPoint[]): number {

        return data.reduce((summ, p) => summ += p.amount, 0);
    }

    public getPercent(point: BudgetPoint, data: BudgetPoint[]): number {
 
        return point.amount / this.getTotal(data);
    }
}