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