import { DndContext, DragOverlay, DragStartEvent, DragEndEvent, MouseSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { FC, useState } from "react";
import Draggable from "./Draggable2";
import ScrollableList from "./ScrollableList";
import Droppable from "./Droppable2";

const Overlay: FC = () => {
  const [items] = useState(['1', '2', '3', '4', '5']);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as UniqueIdentifier);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    setParent(event.over ? event.over.id : null);
  }

  // function handleDragEnd() {
  //   setActiveId(null);
  // }

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
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="mb-5 border-black border-2">
          {parent === null ? card("hahaha") : null}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '40px'
        }}>
          <Droppable id="dropAreaA" >
            <ScrollableList>
              {items.map(id =>
                <Draggable key={id} id={id}>
                  {card(id)}
                </Draggable>
              )}
            </ScrollableList>
            {parent === 'dropAreaA' ? card("hahaha") : null}
          </Droppable>
          <Droppable id="dropAreaB" >
            {parent === 'dropAreaB' ? card("hahaha") : null}
          </Droppable>

          <DragOverlay>
            {typeof activeId === 'string' ? card(activeId) : null}
          </DragOverlay>

          <Droppable id="dropAreaC" >
            {parent === 'dropAreaC' ? card("hahaha") : null}
          </Droppable>

        </div>
      </DndContext>
    </>
  );
}
export default Overlay;
