import { FC } from "react";
import { DroppableProps } from "../utilities/types";
import { useDroppable } from "@dnd-kit/core";

const Droppable: FC<DroppableProps> = ({ id, dragging, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        backgroundColor: isOver ? "lightGreen" : undefined,
        opacity: dragging ? 0.5 : undefined
      }}
    >
      {children}
    </div>
  );
};

export default Droppable;

