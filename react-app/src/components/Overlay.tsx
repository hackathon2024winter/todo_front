import { DndContext, DragOverlay, DragStartEvent, DragEndEvent, MouseSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { FC, useState } from "react";
import Draggable from "./Draggable";
import Droppable from "./Droppable";

const Overlay: FC = () => {
  const [itemLocations, setItemLocations] = useState({
    '1': 'dropAreaA',
    '2': 'dropAreaA',
    '3': 'dropAreaA',
    '4': 'dropAreaA',
    '5': 'dropAreaA',
  });

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as UniqueIdentifier);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      setItemLocations(prev => ({ ...prev, [active.id]: over.id }));
    }
    setActiveId(null);
  };

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

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '40px'
        }}>
          <Droppable id="dropAreaA" >
            {Object.entries(itemLocations).map(([id, location]) =>
              location === 'dropAreaA' ? (
                <Draggable key={id} id={id}>
                  {card(id)}
                </Draggable>
              ) : null
            )}

          </Droppable>
          <Droppable id="dropAreaB" >
            {Object.entries(itemLocations).map(([id, location]) =>
              location === 'dropAreaB' ? (
                <Draggable key={id} id={id}>
                  {card(id)}
                </Draggable>
              ) : null
            )}
          </Droppable>

          <Droppable id="dropAreaC" >
            {Object.entries(itemLocations).map(([id, location]) =>
              location === 'dropAreaC' ? (
                <Draggable key={id} id={id}>
                  {card(id)}
                </Draggable>
              ) : null
            )}
          </Droppable>

          <DragOverlay>
            {typeof activeId === 'string' ? card(activeId) : null}
          </DragOverlay>

        </div>
      </DndContext>
    </>
  );
}
export default Overlay;
