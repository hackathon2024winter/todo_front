

export interface CardType {
    card_pos: number;
    card_id: string;
    col_id: string;
    card_name: string;
    input_date: string;
    due_date: string;
    color: string;
    description: string;
}

export interface CategoryType {
    col_pos: number;
    col_id: string;
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
  cardName: string,
  cardDescription: string,
}

export type CategoryFormType = {
  inputData: string,
}
