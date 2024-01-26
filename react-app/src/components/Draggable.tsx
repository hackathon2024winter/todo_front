import { FC } from "react";
import { useDraggable } from "@dnd-kit/core"
import { DraggableProps } from "../utilities/types";


export const Draggable: FC<DraggableProps> = ({ id, children }) => {
  // useDraggableを使って必要な値をもらう
  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    isDragging
  } = useDraggable({
    id
  });

  const transformStyle = transform ? `translate(${transform.x}px,${transform.y}px)` : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transformStyle,
        touchAction: 'none',
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.5 : undefined,
      }}
    >
      {children}
    </div>
  );
};