export interface PostData {
  id: number;
  title: string;
  body: string;
}

// Todoの型を定義
export interface ToDoProp {
  card_id: number;
  col_id: number;
  card_name: string;
  col_name: string;
  input_date: string;
  due_date: string;
  color: string;
  description: string;
}

export interface ToDoProps {
  todos: ToDoProp[];
}