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
        
        this._total = this._collection.reduce((summ, p) => summ += p.amount, 0);
        return this._total;
    }

    private setPercents(): void {

        for (let point of this._collection) {
            point.percent = point.amount / this.total;
        }
    }

    public getCheckedPoints(): BudgetPoint[] {

        return this._collection.filter((point) => point.check);
    }
}