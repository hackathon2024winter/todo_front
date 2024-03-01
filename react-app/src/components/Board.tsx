import { FC, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CardType, CategoryType, CategoryFormType } from "../utilities/types";
import Category from "./Category";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensors,
  useSensor,
  DragOverEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import MenuBar from "./MenuBar";

const Board: FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [categorys, setCategorys] = useState<CategoryType[]>([]);
  const [isCategoryModal, setCategoryModal] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<null | CardType>(null);
  const [activeCategory, setActiveCategory] = useState<null | CategoryType>(
    null
  );

  // useEffect(() => {
  //   const fetchCategory = async () => {
  //     const response = await fetch(`${BaseURL()}/getcategories`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const resData = await response.json();
  //     // 解析したJSONからitems配列を取得します
  //     const items = resData.data;

  //     // `categoryMap` はオブジェクトであり、キーに基づいてユニークな値を保持します。
  //     // これは配列と異なり、JSONオブジェクトではキーがユニークであるため、
  //     // 新しい要素を追加する際に "append"（末尾に追加する操作）は不要です。
  //     // 既存のキーに新しい値を割り当てると、自動的にそのキーの値が更新されます。
  //     const categoryMap: { [key: string]: CategoryType } = {};

  //     // `items` 配列をforEachでループし、重複がないように `categoryMap` に要素を追加します。
  //     // ここでのキーは `col_id` であり、これがJSONオブジェクトのユニークなプロパティとなります。
  //     items.forEach((item: CategoryType) => {
  //       if (!categoryMap[item.col_id]) {
  //         // ここでの割り当ては、対応するキーが既に存在しない場合にのみ行われます。
  //         // キーが既に存在する場合、新しい割り当ては無視され、値は保持されます。
  //         categoryMap[item.col_id] = {
  //           col_pos: item.col_pos,
  //           col_id: item.col_id,
  //           col_name: item.col_name,
  //           description: item.description,
  //         };
  //       }
  //     });

  //     // マップからソートされた配列を作成し、状態を更新
  //     const categories = Object.values(categoryMap).sort(
  //       (a, b) => a.col_pos - b.col_pos
  //     );
  //     setCategorys(categories);
  //   };

  //   const fetchCard = async () => {
  //     const response = await fetch(`${BaseURL()}/getcards`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const resData = await response.json();
  //     // 解析したJSONからitems配列を取得します
  //     const items = resData.data;

  //     const cardMap: { [key: string]: CardType } = {};

  //     items.forEach((item: CardType) => {
  //       // カードのMapの重複を除いて更新
  //       if (!cardMap[item.card_id]) {
  //         cardMap[item.card_id] = {
  //           card_pos: item.card_pos,
  //           card_id: item.card_id,
  //           col_id: item.col_id,
  //           card_name: item.card_name,
  //           input_date: item.input_date,
  //           due_date: item.due_date,
  //           color: item.color,
  //           description: item.description,
  //         };
  //       }
  //     });

  //     // マップからソートされた配列を作成し、状態を更新
  //     const cards = Object.values(cardMap).sort(
  //       (a, b) => a.card_pos - b.card_pos
  //     );
  //     setCards(cards);
  //   };

  //   fetchCategory();
  //   fetchCard();
  // }, []); // 依存配列を空に設定して、コンポーネントのマウント時にのみ実行

  const categorysId = useMemo(
    () => categorys.map((category) => category.col_id),
    [categorys]
  );

  useEffect(() => {
    for (let i = 0; i < categorys.length; i++) {
      categorys[i].col_pos = i;
    }
  }, [categorys]);

  useEffect(() => {
    for (let i = 0; i < cards.length; i++) {
      cards[i].card_pos = i;
    }
  }, [cards]);

  const createCard = (
    card_name: string,
    col_id: string,
    card_description: string,
    due_date: string,
    color: string
  ) => {

    const today = new Date()
    const year = String(today.getFullYear())
    const month = String(today.getMonth() + 1);
    const date = String(today.getDate())

    const input_date = year + "/" + month + "/" + date

    const cardToAdd: CardType = {
      card_pos: cards.length,
      card_id: uuid(),
      col_id: col_id,
      card_name: card_name,
      input_date: input_date,
      due_date: due_date,
      color: color,
      description: card_description,
    };

    setCards([...cards, cardToAdd]);
  };

  const deleteCard = (id: string) => {
    const filteredCards = cards.filter((card) => card.card_id !== id);
    setCards(filteredCards);
  };

  const createCategory = (col_name: string) => {
    const categoryToAdd: CategoryType = {
      col_id: uuid(),
      col_name: col_name,
      col_pos: categorys.length,
      description: "string",
    };

    setCategorys([...categorys, categoryToAdd]);
  };

  const deleteCategory = (id: string | number) => {
    const filteredCategorys = categorys.filter(
      (category) => category.col_id !== id
    );
    setCategorys(filteredCategorys);

    const newCards = cards.filter((card) => card.col_id !== id);
    setCards(newCards);
  };

  const categoryModalOpen = () => {
    setCategoryModal(true);
  };

  const categoryModalClose = () => {
    setCategoryModal(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormType>();

  const onsubmit = (data: CategoryFormType) => {
    categoryModalClose();
    reset();

    const col_name = data.inputData;
    createCategory(col_name);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "CategoryType") {
      setActiveCategory(event.active.data.current.category);
      return;
    }

    if (event.active.data.current?.type === "CardType") {
      setActiveCard(event.active.data.current.card);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeCategoryId = active.id;
    const overCategoryId = over.id;

    if (activeCategoryId === overCategoryId) return;

    const activeCategoryIndex = categorys.findIndex(
      (category) => category.col_id === activeCategoryId
    );

    const overCategoryIndex = categorys.findIndex(
      (category) => category.col_id === overCategoryId
    );

    setCategorys((categorys) => {
      return arrayMove(categorys, activeCategoryIndex, overCategoryIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    setActiveCard(null);
    setActiveCategory(null);

    const { active, over } = event;
    if (!over) return;

    const activeCardId = active.id;
    const overCardId = over.id;

    const isActiveCard = active.data.current?.type === "CardType";
    const isOverCard = over.data.current?.type === "CardType";

    if (activeCardId === overCardId) return;
    if (!isActiveCard) return;

    if (isActiveCard && isOverCard) {
      setCards((cards) => {
        const activeCardIndex = cards.findIndex(
          (card) => card.card_id === activeCardId
        );

        const overCardIndex = cards.findIndex(
          (card) => card.card_id === overCardId
        );

        cards[activeCardIndex].col_id = cards[overCardIndex].col_id;

        return arrayMove(cards, activeCardIndex, overCardIndex);
      });
    }

    const isAcrossCategory = over.data.current?.type === "CategoryType";

    if (isActiveCard && isAcrossCategory) {
      setCards((cards) => {
        const activeCardIndex = cards.findIndex(
          (card) => card.card_id == activeCardId
        );

        cards[activeCardIndex].col_id = overCardId.toString();

        return arrayMove(cards, activeCardIndex, activeCardIndex);
      });
    }
  };

  return (
    <div className="bg-PoulGray h-full">
      <MenuBar />
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <div className=" m-auto flex flex-row gap-4 bg-PoulGray">
          <div className=" flex flex-row ">
            <SortableContext items={categorysId}>
              {categorys.map((category) => (
                <Category
                  key={category.col_id}
                  category={category}
                  deleteCategory={deleteCategory}
                  createCard={createCard}
                  cards={cards.filter(
                    (card) => card.col_id === category.col_id
                  )}
                  deleteCard={deleteCard}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={categoryModalOpen}
            className="
        h-[60px]
        rounded-lg p-2 
        bg-PoulOrange 
        cursor-pointer active:scale-95 focus:outline-none
        select-none
        hover:text-white hover:bg-opacity-50
        "
          >
            <div className="flex justify-center text-black-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 black-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              カテゴリの追加
            </div>
          </button>
        </div>
      </DndContext>
      {isCategoryModal && (
        <div>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-1/5 shadow-lg rounded-md bg-white">
              <div className="flex justify-between mb-3">
                <div className="text-black text-lg text-center grow ">
                  カテゴリの追加
                </div>
                <button onClick={categoryModalClose} className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="mb-3 text-center">
                  <input
                    id="inputData"
                    type="text"
                    placeholder="カテゴリ名を入力"
                    {...register("inputData", {
                      required: "カテゴリ名は必須です",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-500 focus:ring-2"
                  />
                  {errors.inputData && (
                    <div className="text-black">{errors.inputData.message}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="block ml-auto mr-auto m-2 rounded-lg bg-PoulBlue px-3 py-2 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-opacity-50 focus-visible:ring active:bg-gray-600 md:text-base"
                >
                  送信
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Board;
