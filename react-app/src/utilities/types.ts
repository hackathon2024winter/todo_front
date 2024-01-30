export interface PostData {
  id: number;
  title: string;
  body: string;
}

// Todoの型を定義
export interface ToDoItem {
  card_id: number;
  col_id: number;
  card_name: string;
  col_name: string;
  input_date: string;
  due_date: string;
  color: string;
  description: string;
}

// ToDoリストを表す型
export interface ToDoList {
  items: ToDoItem[]; // ToDoItemの配列
}