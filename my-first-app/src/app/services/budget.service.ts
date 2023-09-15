import { Injectable } from "@angular/core";
import { BudgetPoint } from "../utils/types";

@Injectable({providedIn: 'root'})
export class BudgetService {

    private _collection: BudgetPoint[];
    private _total: number;

    constructor() {}

    get collection(): BudgetPoint[] {

        return this._collection;
    }

    set collection(collection: BudgetPoint[]) {

        this._collection = collection;
        this.setPercents();
    }

    get total(): number {
        
        this.setTotal();
        return this._total;
    }

    private setPercents(): void {

        for (let point of this._collection) {
            point.percent = point.amount / this.total;
        }
    }

    private setTotal(): void {

        this._total = this._collection.reduce((summ, p) => summ += p.amount, 0);
    }

    public getCheckedPoints(): BudgetPoint[] {

        return this._collection.filter((point) => point.check);
    }

    public deletePoint(index: number): BudgetPoint[] {

        this._collection = this._collection.filter((p, i) => index !== i);
        this.setPercents();
        this.setTotal();

        return this._collection;
    }
}