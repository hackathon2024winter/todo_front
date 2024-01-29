import { DndContext, DragOverlay, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { FC, useState } from "react";
import Draggable from "./Draggable2";
import ScrollableList from "./ScrollableList";
import Item from "./Item";


const Overlay: FC = () => {
  const [items] = useState(['1', '2', '3', '4', '5']);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as UniqueIdentifier);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Overlay</h2>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <ScrollableList>
          {items.map(id =>
            <Draggable key={id} id={id}>
              <Item value={`Item ${id}`} />
            </Draggable>
          )}
        </ScrollableList>

        <DragOverlay>
          {activeId ? (
            <Item value={`Item ${activeId}`} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
export default Overlay;
