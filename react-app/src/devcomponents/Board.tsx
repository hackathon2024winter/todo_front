import { FC, useCallback, useEffect, useState } from "react";
import { DragStartEvent, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  // DraggableItem,
  // DraggableHandle,
  DraggableList,
} from "./DraggableComponents";
import AddCategoryModal from "./AddCategoryModal";
import { CardType, CategoryType } from "../utilities/ttypes";
import Category from "./Category";

const Board: FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);
  const [draggedCategory, setdraggedCategory] = useState<CategoryType | null>(
    null
  );

  // カテゴリ追加の表示状態を管理するstate
  const [isAddCategoryModal, setAddCategoryModal] = useState(false);

  useEffect(() => {
    // ここで商品データを初期化
    // 実際のアプリではAPIからデータをフェッチすることが多いですが、例示のために静的なデータを使用
    const initialCategories: CategoryType[] = [
      {
        col_pos: 1,
        id: "76cfdd6b-32d9-4938-9c03-32905e50f7ac",
        col_name: "未着手",
        description: "まだ手を付けていないもの",
      },
      {
        col_pos: 2,
        id: "734c5844-7cba-4c51-8d0c-9830d09bb562",
        col_name: "進行中",
        description: "現在進行中",
      },
      {
        col_pos: 3,
        id: "7414208f-560c-4641-8d08-f7ea576d4f6f",
        col_name: "完了",
        description: "完了しました",
      },
      {
        col_pos: 4,
        id: "bf7e0b03-ecd8-415a-8f6b-36ae8c4154ed",
        col_name: "未分類",
        description: "まだよくわからない",
      },
    ];
    setCategories(initialCategories);

    const initialCards: CardType[] = [
      {
        "id": "5fa25678-4df3-458b-87a8-df45397daba3",
        "card_pos": 1,
        "col_id": "76cfdd6b-32d9-4938-9c03-32905e50f7ac",
        "card_name": "朝ごはんを作る",
        "input_date": "2024-01-30",
        "due_date": "2024-01-31",
        "color": "color1",
        "description": "昨日のカレー"
      },
      {
        "id": "b2c04f39-66d7-4eaf-af36-d52a23492e94",
        "card_pos": 2,
        "col_id": "734c5844-7cba-4c51-8d0c-9830d09bb562",
        "card_name": "レポートを書く",
        "input_date": "2024-01-30",
        "due_date": "2024-02-05",
        "color": "color2",
        "description": "市場分析に関するレポート"
      },
      {
        "id": "7e26623f-2903-4e60-b146-0075d38e7503",
        "card_pos": 3,
        "col_id": "76cfdd6b-32d9-4938-9c03-32905e50f7ac",
        "card_name": "ジムに行く",
        "input_date": "2024-01-30",
        "due_date": "2024-01-31",
        "color": "color3",
        "description": "新しいトレーニングプランを試す"
      },
    ]
    setCards(initialCards)

  }, []); // 空の依存配列を渡して、マウント時にのみ実行

  const onDragStart = useCallback(
    (e: DragStartEvent) => {
      const { active } = e;
      const activeProduct = categories.find(
        (category) => category.id === active.id
      );
      setdraggedCategory(activeProduct || null);
    },
    [categories]
  );

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;
      setdraggedCategory(null);

      // `active`がドラッグされた要素、`over`がドロップされた要素
      if (active.id !== over?.id) {
        // 両方のidが存在し、異なる場合に配列の順序を変更
        const oldIndex = categories.findIndex(
          (category) => category.id === active.id
        );
        const newIndex = categories.findIndex(
          (category) => category.id === over?.id
        );

        // `arrayMove`で新しい配列を作成
        const newCategories = arrayMove(categories, oldIndex, newIndex);

        // ステートを更新
        setCategories(newCategories);
      }
    },
    [categories]
  );

  // カテゴリ追加を開く関数
  const openAddCategory = () => {
    setAddCategoryModal(true);
  };

  // カテゴリ追加を閉じる関数
  const closeAddCategory = () => {
    setAddCategoryModal(false);
  };

  return (
    <>
      <div className=" m-auto flex flex-row gap-4">
        <DraggableList<CategoryType>
          items={categories}
          layout="grid"
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <div className=" flex flex-row gap-4">
            {categories.map((category) => (
              <div key={category.id} className="">
                <Category
                  category={category}
                  setCategories={setCategories}//状態categoriesとそのアクセッサーsetCategoriesは個別のプロパティで渡すべき。
                  setCards={setCards}//状態cardsとそのアクセッサーsetCardsは個別のプロパティで渡すべき。
                  cards={cards}
                  className="bg-[#ECDED5] w-[230px] h-[300px] max-h-[500px] rounded-md"
                />
              </div>
            ))}
          </div>
          {/* <DragOverlay>
            {draggedCategory ? (
              <Category
                category={draggedCategory}
                setCategories={setCategories}
                setCards={setCards}
                cards={cards}
                className="bg-[#ECDED5] w-[230px] h-[300px] max-h-[500px] rounded-md"
              />
            ) : null}
          </DragOverlay> */}
        </DraggableList>

        <button
          onClick={openAddCategory}
          className="
         h-[60px]
         border-2 rounded-lg p-2
         bg-[#ECDED5] border-orange-400
         cursor-pointer shadow-custom active:shadow-none active:scale-95 focus:outline-none
         select-none
         "
        >
          カテゴリの追加
        </button>
      </div>
      {isAddCategoryModal && (
        <AddCategoryModal
          closeAddCategory={closeAddCategory}
          setCategories={setCategories}
        />
      )}
    </>
  );
};

export default Board;

// import { FC, useEffect, useMemo, useState, } from "react";
// import { createPortal } from "react-dom";
// import { CardType, CategoryType, CategoryFormType } from "../utilities/types";
// import Category from "./Category";
// import {
//   DndContext,
//   DragEndEvent,
//   DragOverlay,
//   DragStartEvent,
//   PointerSensor,
//   useSensors,
//   useSensor,
//   DragOverEvent,
// } from "@dnd-kit/core";
// import { SortableContext, arrayMove } from "@dnd-kit/sortable";
// import { useForm } from "react-hook-form";
// import { v4 as uuid } from "uuid";
// import { BaseURL } from "../utilities/base_url";

// const Board: FC = () => {
//   const [cards, setCards] = useState<CardType[]>([]);
//   const [categorys, setCategorys] = useState<CategoryType[]>([]);
//   const [isCategoryModal, setCategoryModal] = useState<boolean>(false);
//   const [activeCard, setActiveCard] = useState<null | CardType>(null);
//   const [activeCategory, setActiveCategory] = useState<null | CategoryType>(
//     null
//   );

//   useEffect(() => {
//     const fetchCategory = async () => {
//       const response = await fetch(`${BaseURL()}/getcategories`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const resData = await response.json();
//       // 解析したJSONからitems配列を取得します
//       const items = resData.data;

//       // `categoryMap` はオブジェクトであり、キーに基づいてユニークな値を保持します。
//       // これは配列と異なり、JSONオブジェクトではキーがユニークであるため、
//       // 新しい要素を追加する際に "append"（末尾に追加する操作）は不要です。
//       // 既存のキーに新しい値を割り当てると、自動的にそのキーの値が更新されます。
//       const categoryMap: { [key: string]: CategoryType } = {};

//       // `items` 配列をforEachでループし、重複がないように `categoryMap` に要素を追加します。
//       // ここでのキーは `col_id` であり、これがJSONオブジェクトのユニークなプロパティとなります。
//       items.forEach((item: CategoryType) => {
//         if (!categoryMap[item.col_id]) {
//           // ここでの割り当ては、対応するキーが既に存在しない場合にのみ行われます。
//           // キーが既に存在する場合、新しい割り当ては無視され、値は保持されます。
//           categoryMap[item.col_id] = {
//             col_pos: item.col_pos,
//             col_id: item.col_id,
//             col_name: item.col_name,
//             description: item.description,
//           };
//         }
//       });

//       // マップからソートされた配列を作成し、状態を更新
//       const categories = Object.values(categoryMap).sort(
//         (a, b) => a.col_pos - b.col_pos
//       );
//       setCategorys(categories);
//     };

//     const fetchCard = async () => {
//       const response = await fetch(`${BaseURL()}/getcards`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const resData = await response.json();
//       // 解析したJSONからitems配列を取得します
//       const items = resData.data;

//       const cardMap: { [key: string]: CardType } = {};

//       items.forEach((item: CardType) => {
//         // カードのMapの重複を除いて更新
//         if (!cardMap[item.card_id]) {
//           cardMap[item.card_id] = {
//             card_pos: item.card_pos,
//             card_id: item.card_id,
//             col_id: item.col_id,
//             card_name: item.card_name,
//             input_date: item.input_date,
//             due_date: item.due_date,
//             color: item.color,
//             description: item.description,
//           };
//         }
//       });

//       // マップからソートされた配列を作成し、状態を更新
//       const cards = Object.values(cardMap).sort(
//         (a, b) => a.card_pos - b.card_pos
//       );
//       setCards(cards);
//     };

//     fetchCategory();
//     fetchCard();
//   }, []); // 依存配列を空に設定して、コンポーネントのマウント時にのみ実行

//   const categorysId = useMemo(
//     () => categorys.map((category) => category.col_id),
//     [categorys]
//   );

//   useEffect(() => {
//     for (let i = 0; i < categorys.length; i++) {
//       categorys[i].col_pos = i;
//     }
//   }, [categorys])

//   useEffect(() => {
//     for (let i = 0; i < cards.length; i++) {
//       cards[i].card_pos = i;
//     }
//   }, [cards])

//   const createCard = (card: CardType) => {
//     const cardToAdd: CardType = {
//       card_pos: cards.length,
//       card_id: uuid(),
//       col_id: card.col_id,
//       card_name: card.card_name,
//       input_date: card.input_date,
//       due_date: card.due_date,
//       color: card.color,
//       description: card.description,
//     };

//     setCards([...cards, cardToAdd]);
//   };

//   const deleteCard = (id: string) => {
//     const filteredCards = cards.filter((card) => card.card_id !== id);
//     setCards(filteredCards);
//   };

//   const createCategory = (col_name: string) => {
//     const categoryId = uuid();

//     const categoryToAdd: CategoryType = {
//       col_id: categoryId,
//       col_name: col_name,
//       col_pos: categorys.length,
//       description: "string",
//     };

//     setCategorys([...categorys, categoryToAdd]);
//   };

//   const deleteCategory = (id: string | number) => {
//     const filteredCategorys = categorys.filter(
//       (category) => category.col_id !== id
//     );
//     setCategorys(filteredCategorys);

//     const newCards = cards.filter((card) => card.col_id !== id);
//     setCards(newCards);
//   };

//   const categoryModalOpen = () => {
//     setCategoryModal(true);
//   };

//   const categoryModalClose = () => {
//     setCategoryModal(false);
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isDirty, isValid },
//   } = useForm<CategoryFormType>();

//   const onsubmit = (data: CategoryFormType) => {
//     const col_name = data.inputData;
//     createCategory(col_name);
//   };

//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 5,
//       },
//     })
//   );

//   const onDragStart = (event: DragStartEvent) => {
//     if (event.active.data.current?.type === "CategoryType") {
//       setActiveCategory(event.active.data.current.category);
//       return;
//     }

//     if (event.active.data.current?.type === "CardType") {
//       setActiveCard(event.active.data.current.card);
//       return;
//     }
//   };

//   const onDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over) return;

//     const activeCategoryId = active.id;
//     const overCategoryId = over.id;

//     if (activeCategoryId === overCategoryId) return;

//     const activeCategoryIndex = categorys.findIndex(
//       (category) => category.col_id === activeCategoryId
//     );

//     const overCategoryIndex = categorys.findIndex(
//       (category) => category.col_id === overCategoryId
//     );

//     setCategorys((categorys) => {
//       return arrayMove(categorys, activeCategoryIndex, overCategoryIndex)
//     })
//   }

//   const onDragOver = (event: DragOverEvent) => {
//     setActiveCard(null);
//     setActiveCategory(null);

//     const { active, over } = event;
//     if (!over) return;

//     const activeCardId = active.id;
//     const overCardId = over.id;

//     const isActiveCard = active.data.current?.type === 'CardType'
//     const isOverCard = over.data.current?.type === 'CardType'

//     if (activeCardId === overCardId) return;
//     if (!isActiveCard) return;

//     if (isActiveCard && isOverCard) {
//       const activeCardIndex = cards.findIndex(
//         (card) => card.card_id === activeCardId
//       );

//       const overCardIndex = cards.findIndex(
//         (card) => card.card_id === overCardId
//       )

//       setCards((cards) => {

//         cards[activeCardIndex].col_id = cards[overCardIndex].col_id;

//         return arrayMove(cards, activeCardIndex, overCardIndex);
//       });
//     }

//     const isAcrossCategory = over.data.current?.type === "CategoryType";

//     if (isActiveCard && isAcrossCategory) {
//       setCards((cards) => {
//         const activeCardIndex = cards.findIndex(
//           (card) => card.card_id == activeCardId
//         );

//         cards[activeCardIndex].col_id = overCardId.toString();

//         return arrayMove(cards, activeCardIndex, activeCardIndex);
//       });
//     }
//   };

//   return (
//     <div>
//       <DndContext
//         onDragStart={onDragStart}
//         onDragEnd={onDragEnd}
//         onDragOver={onDragOver}
//         sensors={sensors}
//       >
//         <div className=" m-auto flex flex-row gap-4">
//           <div className=" flex flex-row grap-4 gap-4">
//             <SortableContext items={categorysId}>
//               {categorys.map((category) => (
//                 <Category
//                   key={category.col_id}
//                   category={category}
//                   deleteCategory={deleteCategory}
//                   createCard={createCard}
//                   cards={cards.filter(
//                     (card) => card.col_id === category.col_id
//                   )}
//                   deleteCard={deleteCard}
//                 />
//               ))}
//             </SortableContext>
//           </div>
//           <button
//             onClick={categoryModalOpen}
//             className="
//         h-[60px]
//         border-2 rounded-lg p-2
//         bg-orange-200 border-orange-400
//         cursor-pointer shadow-custom active:shadow-none active:scale-95 focus:outline-none
//         select-none
//         "
//           >
//             カテゴリの追加
//           </button>
//         </div>
//       </DndContext>
//       {isCategoryModal && (
//         <div>
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
//             <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//               <form onSubmit={handleSubmit(onsubmit)}>
//                 <div>
//                   <label htmlFor="inputData">タイトル</label>
//                   <br />
//                   <input
//                     id="inputData"
//                     type="text"
//                     {...register("inputData", {
//                       required: "タイトルは必須です",
//                     })}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-500 focus:ring-2"
//                   />
//                   {errors.inputData && <div>{errors.inputData.message}</div>}
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-20 px-4 py-2 bg-blue-500 text-white rounded"
//                   disabled={!isDirty || !isValid}
//                 >
//                   送信
//                 </button>
//               </form>
//               <div className="">
//                 <button
//                   onClick={categoryModalClose}
//                   className="w-20 px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   閉じる
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default Board;
