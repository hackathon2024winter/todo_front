import { FC } from "react";
import { Draggable } from "./Draggable";
import { useDraggable } from "@dnd-kit/core";


interface DraggableProps {
  handle?: boolean;
}

const DraggableItem: FC<DraggableProps> = ({ handle }) => {
  const { isDragging, setNodeRef, listeners } = useDraggable({
    id: 'draggable-item',
  });

  return (
    <Draggable
      dragging={isDragging}
      ref={setNodeRef}
      handle={handle}
      listeners={listeners}
      style={{
        opacity: isDragging ? 0 : undefined,
      }}
    />
  );
}

export default DraggableItem;