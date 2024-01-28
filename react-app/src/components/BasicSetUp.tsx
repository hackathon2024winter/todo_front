import { FC, useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  UniqueIdentifier,
  pointerWithin
} from "@dnd-kit/core";
import Card from "./Card";
import Droppable from "./Droppable";

const BasicSetUp: FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  );

  const card = <Card id={"draggableA"} children={
    <div
      className="w-fit h-fit p-4 m-2 border-2 rounded-lg border-green-900 bg-green-500 select-none"
    >
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        onClick={() => console.log("hello")}
      >
        Basic SetUp
      </button>
    </div>
  } />

  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Basic SetUp</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={({ over }) => {
          setParent(over ? over.id : null);
          setIsDragging(false);
        }}
        onDragCancel={() => setIsDragging(false)}
      >
        {parent === null ? card : null}
        <Droppable key='A' id='A' dragging={isDragging}>
          {({ isOver, dragging }) => (
            <div
              style={{
                backgroundColor: isOver ? "lightGreen" : undefined,
                opacity: dragging ? 0.5 : undefined,
                position: "relative",
                paddingTop: "80px",
                textAlign: "center",
                borderRadius: "10px",
                width: "340px",
                height: "340px",
              }}
              className="bg-gray-300 border-green-700 border-4"
            >
              {parent === 'A' ? card : null}
            </div>
          )}
        </Droppable>
      </DndContext>
    </>
  )
}
export default BasicSetUp;

