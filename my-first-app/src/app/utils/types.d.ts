import { DataSource } from "@angular/cdk/collections";

export interface User {
    name: string;
    lastName: string;
    email: string;
    birthDate: Date;
    password: string;
}

export interface Post {
    id: number;
    title: string;
    body: string;
}

export interface PostForm extends Post {
    formTitle: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface BudgetPoint {
    check: boolean;
    category: string;
    item:{ title: string, description: string };
    amount: number;
    percent: number;
}

export interface TableData {
    name: string;
    dataSource: BudgetPoint[];
}