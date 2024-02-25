import { ReactNode } from "react";

export interface PostData {
  id: number;
  title: string;
  body: string;
}

export interface DraggableItem {
  id: number;
  children: ReactNode
}

export interface DroppableItem {
  id: number;
  children: ReactNode;
  className: string;
  onIsOverChange?: (isOver: boolean) => void;
}

export interface ToDoContainerItem {
  col_id: number;
  col_name: string;
  children?: ReactNode;
}

export interface ToDoContainerList {
  items: ToDoContainerItem[];
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

//Modalで編集するTodo型
export interface EditToDoItem {
  item: ToDoItem;
  closeModal: () => void;
}

export interface AddContainerItem {
  addContainer: (item: ToDoContainerItem) => void;
  closeAddContainer: () => void;
}

export type LoginForm = {
  email: string;
  password: string;
}

export type CategoryType ={
  col_id: string,
  col_name : string,
  col_pos : number,
}

export type CategoryFormType = {
  inputData: string,
}

export type CardFormType = {
  inputData: string,
}

export type CardType = {
  card_id: string,
  card_name: string,
  col_id: string | number,
  card_pos: number,
}