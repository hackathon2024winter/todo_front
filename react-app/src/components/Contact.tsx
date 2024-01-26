import { FC, useState } from "react";
import { DndContext, UniqueIdentifier } from "@dnd-kit/core";
import Card from "./Card";
import Droppable from "./Droppable";

const Contact: FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const card = <Card id={"draggableA"} children={
    <div
      className="w-fit h-fit p-4 m-2 border-2 rounded-lg border-green-900 bg-green-500 select-none"
    >
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        onClick={() => console.log("hello")}
      >
        Contact
      </button>
    </div>
  } />

  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Contact</h2>
      <DndContext
        onDragStart={() => setIsDragging(true)}
        onDragEnd={({ over }) => {
          setParent(over ? over.id : null);
          setIsDragging(false);
        }}
        onDragCancel={() => setIsDragging(false)}
      >
        {parent === null ? card : null}
        <Droppable key='A' id='A' dragging={isDragging} children={
          <div className="w-48 h-48 bg-orange-400">
            {parent === 'A' ? card : null}
          </div>
        }
        />
      </DndContext>
    </>
  )
}
export default Contact;