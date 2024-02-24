export interface CardType {
    card_pos: number;
    card_id: string;
    col_id: string | number;
    card_name: string;
    input_date: string;
    due_date: string;
    color: string;
    description: string;
}

export interface CategoryType {
    col_pos: number;
    col_id: string,
    col_name: string,
}