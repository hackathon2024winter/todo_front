import { ReactNode } from "react";

export interface PostData {
  id: number;
  title: string;
  body: string;
}

export type DraggableProps = {
  id: string;
  children: ReactNode;
}
