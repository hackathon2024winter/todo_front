import { useState } from "react";
import {
  useDroppable,
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import TodoItem, { Todo, UniqueIdentifier } from "./Item";
import TodoForm from "./TodoForm"

export type ColumnType = {
  col_id: number;
  col_position: number;
  col_name: string;
  cards: Todo[];
};

const TodoListForm = (props: ColumnType): JSX.Element => {
  const [todoItemList, setTodoList] = useState<Todo[]>([
    {
      card_id: 1,
      card_position: 1,
      col_id: 1,
      col_position: 1,
      col_name: "未着手",
      title: "タイトル",
      content: "TODO内容はここに記載します。",
      border_Color: "border-green-500",
    },
    {
      card_id: 2,
      card_position: 2,
      col_id: 1,
      col_position: 1,
      col_name: "未着手",
      title: "タイトル2",
      content: "TODO内容の二番目",
      border_Color: "border-pink-500",
    },
    {
      card_id: 3,
      card_position: 1,
      col_id: 2,
      col_position: 2,
      col_name: "着手中",
      title: "タイトル3",
      content: "TODO内容の3番目",
      border_Color: "border-red-500",
    },
  ]);

  // const [columns, setColumns] = useState<ColumnType[]>(data);
  // // ドラックした場所にあるCardもしくはColmunのidを取得した際
  // // 上記のデータ構造からどのカラムにドロップされたかCard idから走査する
  // const findColumn = (unique: number | null) => {
  //   if (!unique) {
  //     return null;
  //   }
  //   // overの対象がcolumnの場合があるためそのままidを返す
  //   if (columns.some((c) => c.col_id === unique)) {
  //     return columns.find((c) => c.col_id === unique) ?? null;
  //   }

  //   // over対象がcardの場合取得したidからover先がどのカラムか取得する
  //   const id = String(unique);
  //   const itemWithColumnId = columns.flatMap((c) => {
  //     const columnId = c.col_id;
  //     return c.cards.map((i) => ({ itemId: i.card_id, columnId: columnId }));
  //   });
  //   const columnId = itemWithColumnId.find(
  //     (i) => i.itemId === Number(id)
  //   )?.columnId;
  //   return columns.find((c) => c.col_id === columnId) ?? null;
  // };

  const { setNodeRef } = useDroppable({ id: "todo-list" });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // const handleDragOver = (event: DragEndEvent) => {
  //   const { active, over } = event;

  //   console.log("over");

  //   if (!over || active.id === over.id) {
  //     return;
  //   }

  //   const overId = String(over.id);
  //   const overColumn = findColumn(overId);

  //   // active.idからtodoを特定しstatusをcolumnのid(status)に変更する
  //   const updatedTodoList = todoItemList.map((todo) => {
  //     return todo.card_id === active.id
  //       ? { ...todo, status: overColumn || overId }
  //       : todo;
  //   });

  //   setTodoList(updatedTodoList);
  // };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log("end");

    if (!over || active.id === over.id) {
      return;
    }

    const overId = String(over.id);
    // const overColumn = findColumn(Number(overId));

    // over先todoのidが異なればデータの入れ替えを行う
    if (active.id !== over.id) {
      const oldIndex = todoItemList.findIndex((v) => v.card_id === active.id);
      const newIndex = todoItemList.findIndex((v) => v.card_id === over.id);

      // active.idからtodoを特定しstatusをcolumnのid(status)に変更する
      setTodoList(arrayMove(todoItemList, oldIndex, newIndex));
    }
  };

  const addTodoOnClick = (todo: Todo) => {
    // const newTodoList = todoItemList.slice();
    const newTodoList = [...todoItemList];

    newTodoList.push(todo);
    setTodoList(newTodoList);
    console.log("追加");
  };

  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="mx-2 px-4 py-2 rounded-lg bg-gray-200">
          <p>{props.col_name}</p>
          <SortableContext
            id="todo-list"
            items={todoItemList.map((todo) => todo.card_id as UniqueIdentifier)}
            strategy={rectSortingStrategy}
          >
            <div ref={setNodeRef}>
              {todoItemList.map((todo) => {
                return <TodoItem key={todo.card_id} {...todo} />;
              })}
              <button onClick={openModal}>カードの追加</button>
              <TodoForm
                addTodoOnclick={addTodoOnClick}
                todoItemList={todoItemList}
              />
            </div>
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
};

export default TodoListForm;