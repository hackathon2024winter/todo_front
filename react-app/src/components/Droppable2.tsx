import { useDroppable } from "@dnd-kit/core";
import { FC, ReactNode } from "react";

type DroppableProp = {
  id: string;
  children: ReactNode;
}

const Droppable: FC<DroppableProp> = ({ children, id }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        width: "200px",
        height: "300px",
        backgroundColor: isOver ? "lightgreen" : undefined,
        // minHeight: "300px",
        overflowX: "auto",
        padding: 2,
        border: "1px solid black"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}
      >
        <span
          style={{
            fontWeight: "bold"
          }}
        >
          ドロップエリア
        </span>
        {children}
      </div>
    </div>
  )
}

export default Droppable;