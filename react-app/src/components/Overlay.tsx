import { DndContext, DragOverlay, DragStartEvent, DragEndEvent, MouseSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { FC, useEffect, useState } from "react";
import { ToDoContainerItem, ToDoContainerList, ToDoList } from "../utilities/types";
import { dummyFetch } from "../utilities/dummy_fetch";
import Todo from "./ToDo"
import ToDoContainer from "./ToDoCotainer";
import AddContainerModal from "./AddContainerModal";

const Overlay: FC = () => {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  );

  // カテゴリ追加の表示状態を管理するstate
  const [isAddContainerModal, setAddContainerModal] = useState(false);

  // カテゴリ追加を開く関数
  const openAddContainer = () => {
    setAddContainerModal(true);
  };

  // カテゴリ追加を閉じる関数
  const closeAddContainer = () => {
    setAddContainerModal(false);
  };

  // 新しいカテゴリアイテムのための状態
  const [container, setContainer] = useState<ToDoContainerItem | null>(null);

  // カテゴリリストのための状態
  const [containers, setContainers] = useState<ToDoContainerList>({ items: [] });

  // 新しいカテゴリアイテムをリストに追加する関数
  const addContainer = (newContainer: ToDoContainerItem) => {
    setContainers((prev) => {
      // 最新の col_id を取得して 1 を加算する
      const nextColId = prev.items.length > 0
        ? Math.max(...prev.items.map(item => item.col_id)) + 1
        : 1;  // items が空の場合は 1 を使う

      // 新しい col_id を設定する
      const updatedNewContainer = { ...newContainer, col_id: nextColId };

      // 更新された newContainer を配列に追加する
      return {
        ...prev,
        items: [...prev.items, updatedNewContainer],
      };
    });
  };

  // AddContainerから渡される新しいカテゴリアイテムを受け取り、状態を更新する
  useEffect(() => {
    if (container) {
      addContainer(container);
      setContainer(null); // containerを追加したら状態をリセット
    }
  }, [container]);

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
        <div className="flex flex-row items-start gap-10" >
          {containers && containers.items.map((container) =>
            <ToDoContainer key={container.col_id} col_id={container.col_id} col_name={container.col_name} >
              {todos && todos.items.map((todo) =>
                todo.col_id === container.col_id ? <Todo key={todo.card_id} item={todo} /> : null
              )}
            </ToDoContainer>
          )}
          <div
            onClick={openAddContainer}
            className="
              inline-flex items-center 
              border-2 rounded-lg p-2 
              bg-orange-200 border-orange-400 
              cursor-pointer shadow-custom active:shadow-none active:scale-95 focus:outline-none
              select-none"
          >
            <div className="text-lg mr-2">⨁</div>
            <div>カテゴリの追加</div>
          </div>

          <DragOverlay >
            {activeItem ? (<Todo key={activeItem.card_id} item={activeItem} />) : null}
          </DragOverlay>
        </div >
      </DndContext >
      {isAddContainerModal && <AddContainerModal closeAddContainer={closeAddContainer} addContainer={setContainer} />}
    </>
  );
}
export default Overlay;
