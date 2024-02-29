export interface CardFetchType {
    card_id: string;
    card_pos: number;
    col_id: string;
    card_name: string;
    input_date: string;
    due_date: string;
    color: string;
    description: string;
}


export interface CardType {
    id: string;
    card_pos: number;
    col_id: string;
    card_name: string;
    input_date: string;
    due_date: string;
    color: string;
    description: string;
}

export interface CategoryFetchType {
    col_id: string;
    col_pos: number;
    col_name: string;
    description: string;
}


export interface CategoryType {
    id: string;
    col_pos: number;
    col_name: string;
    description: string;
}


export type LoginForm = {
    email: string;
    password: string;
}

export type SignupForm = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export type CardFormType = {
    inputData: string,
}