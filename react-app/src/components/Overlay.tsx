import { DndContext, DragOverlay, DragStartEvent, DragEndEvent, MouseSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { FC, useEffect, useState } from "react";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { ToDoProps } from "../utilities/types";
import { dummyFetch } from "../utilities/dummy_tetch";

const Overlay: FC = () => {
  const [todos, setTodos] = useState<ToDoProps | null>(null);
  console.log(todos)

  useEffect(() => {
    // dummyFetchを呼び出し、結果を状態に設定
    const fetchData = async () => {
      const response = await dummyFetch();
      // response.data を ToDoProps 型の todos プロパティにマッピング
      setTodos({ todos: response.todos });
    };

    fetchData();
  }, []); // 空の依存配列を使用して、コンポーネントのマウント時に一度だけ実行する

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

  const cardLocations = () => {
    // const locations = await fetch(url)
    const locations = {
      1: 'dropAreaA',
      2: 'dropAreaA',
      3: 'dropAreaA',
      4: 'dropAreaA',
      5: 'dropAreaA',
    }
    return locations
  }

  const [itemLocations, setItemLocations] = useState(cardLocations);

  const card = (id: string) => <Draggable id={Number(id)} children={
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
                <Draggable key={id} id={Number(id)}>
                  {card(id)}
                </Draggable>
              ) : null
            )}
          </Droppable>
          <Droppable id="dropAreaB" >
            {Object.entries(itemLocations).map(([id, location]) =>
              location === 'dropAreaB' ? (
                <Draggable key={id} id={Number(id)}>
                  {card(id)}
                </Draggable>
              ) : null
            )}
          </Droppable>

          <Droppable id="dropAreaC" >
            {Object.entries(itemLocations).map(([id, location]) =>
              location === 'dropAreaC' ? (
                <Draggable key={id} id={Number(id)}>
                  {card(id)}
                </Draggable>
              ) : null
            )}
          </Droppable>

          <DragOverlay >
            {typeof activeId === 'number' ? card(String(activeId)) : null}
          </DragOverlay>

        </div>
      </DndContext>
    </>
  );
}
export default Overlay;
