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

export interface BudgetPointInfo {
    title: string;
    description: string;
}

export interface BudgetPoint {
    check: boolean;
    category: string;
    item: BudgetPointInfo;
    amount: number;
    percent: number;
}

export interface TableData {
    name: string;
    dataSource: BudgetPoint[];
    total: number;
}

export interface PointData {
    tableName: string;
    index: number
}

export interface PointFullData {
    tableName: string;
    index: number;
    point: BudgetPoint;
}

export interface ChartPointData {
    name: string; 
    data: [number];
    category?: string;
    pointWidth?: number;
    maxPointWidth?: number;
}
