import { FC, useState } from "react";
import { DndContext, pointerWithin, useSensor, useSensors, MouseSensor, UniqueIdentifier } from "@dnd-kit/core";

// import Card from "./Card";
import Droppable from "./Droppable2";
import Draggable from "./Draggable";

const ZennVer: FC = () => {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  );

  const card = <Draggable id={"draggableA"} children={
    <div className="mb-10">
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
    </div>
  } />

  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Zenn Ver</h2>
      <div className="p-2 border-2 border-black">
        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragEnd={({ over }) => {
            setParent(over ? over.id : null);
          }}
        >
          <div className="mb-5 border-black border-2">
            {parent === null ? card : null}
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '40px'
          }}>
            <Droppable id="dropAreaA" >
              {parent === 'dropAreaA' ? card : null}
            </Droppable>
            <Droppable id="dropAreaB" >
              {parent === 'dropAreaB' ? card : null}
            </Droppable>
            <Droppable id="dropAreaC" >
              {parent === 'dropAreaC' ? card : null}
            </Droppable>
          </div>
        </DndContext>
      </div >
    </>
  );
}

export default ZennVer;
