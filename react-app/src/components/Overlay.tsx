import { DndContext, DragOverlay, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { FC, useState } from "react";
import Draggable from "./Draggable2";
import ScrollableList from "./ScrollableList";

const Overlay: FC = () => {
  const [items] = useState(['1', '2', '3', '4', '5']);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as UniqueIdentifier);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  const card = (id: string) => <Draggable id={id} children={
    <div className="mb-2">
      <div
        className="w-fit h-fit p-4 m-2 border-2 rounded-lg border-green-900 bg-green-500 select-none"
      >
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          onClick={() => console.log("hello")}
        >
          Basic SetUp: {id}
        </button>
      </div>
    </div>
  } />

  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Overlay</h2>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <ScrollableList>
          {items.map(id =>
            <Draggable key={id} id={id}>
              {card(id)}
              {/* <Item value={`Item ${id}`} /> */}
            </Draggable>
          )}
        </ScrollableList>

        <DragOverlay>
          {typeof activeId === 'string' ? card(activeId) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
export default Overlay;
