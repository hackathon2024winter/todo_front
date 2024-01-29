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

  const transformStyle = transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        position: isDragging ? "absolute" : "relative", // ドラッグ中はabsoluteにする
        transform: transformStyle,
        touchAction: 'none',
        cursor: isDragging ? "grabbing" : "grab",
        // opacity: isDragging ? 0.5 : 1, //ドラッグ中に最上位にくるようにしたので、不要
        zIndex: isDragging ? "auto" : undefined // ドラッグ中のdomだけz-indexを持つので最上位になる。
      }}
    >
      {children}
    </div>
  );
};
