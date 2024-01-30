import { DndContext, DragOverlay, DragStartEvent, DragEndEvent, MouseSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { FC, useEffect, useState } from "react";
import Droppable from "./Droppable";
import { ToDoList } from "../utilities/types";
import { dummyFetch } from "../utilities/dummy_tetch";
import Todo from "./Todo"

const Overlay: FC = () => {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  );

  const [todos, setTodos] = useState<ToDoList | null>(null);

  useEffect(() => {
    // dummyFetchを呼び出し、結果を状態に設定
    const fetchData = async () => {
      const response = await dummyFetch();
      // response.items を ToDoList 型の items プロパティにマッピング
      setTodos({ items: response.items });
    };

    fetchData();
  }, []); // 空の依存配列を使用して、コンポーネントのマウント時に一度だけ実行する

  //
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const activeItem = todos && todos.items.find((item) => item.card_id === activeId);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as UniqueIdentifier);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // マウスドラッグを終えた位置がDroppableの上だったら
    if (over) {
      setTodos((prevTodos) => {

        // prevTodos が null の場合は、何もしない
        if (prevTodos === null) return null;

        //card_idがactive.idと一致するのtodoを抽出し、col_idをover.idに更新する。
        const updatedItems = prevTodos.items.map((item) => {
          return (item.card_id === active.id ? { ...item, col_id: Number(over.id) } : item);
        });

        // col_idを更新したtodo[]をtodosに戻す。
        return { ...prevTodos, items: updatedItems };
      });
    }
    setActiveId(null);
  };

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
          <Droppable id={1}>
            {todos && todos.items.map((todo) =>
              todo.col_id === 1 ? <Todo key={todo.card_id} item={todo} /> : null
            )}
          </Droppable>

          <Droppable id={2}>
            {todos && todos.items.map((todo) =>
              todo.col_id === 2 ? <Todo key={todo.card_id} item={todo} /> : null
            )}
          </Droppable>

          <Droppable id={3}>
            {todos && todos.items.map((todo) =>
              todo.col_id === 3 ? <Todo key={todo.card_id} item={todo} /> : null
            )}
          </Droppable>

          <DragOverlay >
            {activeItem ? (<Todo key={activeItem.card_id} item={activeItem} />) : null}
          </DragOverlay>

        </div >
      </DndContext >
    </>
  );
}
export default Overlay;
