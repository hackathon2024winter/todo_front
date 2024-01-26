import { FC } from "react";
import { DroppableProps } from "../utilities/types";
import { useDroppable } from "@dnd-kit/core";

const Droppable: FC<DroppableProps> = ({ id, dragging, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  // 子要素が関数であると仮定する
  const renderChildren = typeof children === 'function' ? children({ isOver, dragging }) : children;

  return (
    <div ref={setNodeRef}>{renderChildren}</div>
  );
};

export default Droppable;

