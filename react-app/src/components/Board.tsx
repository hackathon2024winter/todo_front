import { FC, useEffect, useMemo, useState, } from "react";
import { createPortal } from "react-dom";
import { CategoryType, CategoryFormType, CardType } from "../utilities/types";
import Category from "./Category";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensors, useSensor, DragOverEvent} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid"

const Board: FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [categorys, setCategorys] = useState<CategoryType[]>([]);

  const [isCategoryModal, setCategoryModal] = useState<boolean>(false)
  const [activeCard, setActiveCard] = useState<null | CardType>(null)
  const [activeCategory, setActiveCategory] = useState<null | CategoryType>(null)

  const categorysId = useMemo(() => categorys.map((category) => category.col_id), [categorys])

  useEffect(() => {
    for (let i = 0; i < categorys.length; i++) {
      categorys[i].col_pos = i;
    }
  }, [categorys])

  useEffect(() => {
    for (let i = 0; i < cards.length; i++) {
      cards[i].card_pos = i;
    }
  },[cards])

  const createCard = (card_name: string, col_id: string) => {
    const  cardId = uuid();

    const cardToAdd: CardType = {
      card_id: cardId,
      card_name: card_name,
      col_id: col_id,
      card_pos: cards.length 
    }

    setCards([...cards, cardToAdd])
  }

  const deleteCard = (id: string) => {
    const filteredCards = cards.filter((card) => card.card_id !== id);
    setCards(filteredCards);
  }


  const createCategory = (col_name: string) => {
    const categoryId = uuid();

    const categoryToAdd: CategoryType = {
      col_id: categoryId,
      col_name: col_name,
      col_pos: categorys.length 
    }

    setCategorys([...categorys, categoryToAdd])
  }

  const deleteCategory = (id: string | number) => {
    const filteredCategorys = categorys.filter((category) => category.col_id !== id);
    setCategorys(filteredCategorys);

    const newCards = cards.filter((card) => card.col_id !== id)
    setCards(newCards)
  }

  const categoryModalOpen = () => {
    setCategoryModal(true)
  }

  const categoryModalClose = () => {
    setCategoryModal(false)
  }


  const {register, handleSubmit, formState: {errors, isDirty,  isValid}} = useForm<CategoryFormType>();

  const onsubmit = (data: CategoryFormType) => {
    const col_name = data.inputData
    createCategory(col_name)
  }


  const sensors = useSensors(
    useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  })
  );

  const onDragStart = (event: DragStartEvent) => {
    if(event.active.data.current?.type === "CategoryType") {
      setActiveCategory(event.active.data.current.category)
      return;
    }

    if(event.active.data.current?.type === "CardType") {
      setActiveCard(event.active.data.current.card)
      return;
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const {active, over } = event;
    if (!over ) return;

    const activeCategoryId = active.id;
    const overCategoryId = over.id;

    if (activeCategoryId === overCategoryId) return;

    const activeCategoryIndex = categorys.findIndex(
      (category) => category.col_id === activeCategoryId
    );

    const overCategoryIndex = categorys.findIndex(
      (category) => category.col_id === overCategoryId
    )

    setCategorys((categorys) => {
      return arrayMove(categorys, activeCategoryIndex, overCategoryIndex)
    })
  }

  const onDragOver = (event: DragOverEvent) => {
    setActiveCard(null)
    setActiveCategory(null)

    const {active, over } = event;
    if (!over ) return;

    const activeCardId = active.id;
    const overCardId = over.id;

    const isActiveCard = active.data.current?.type === 'CardType'
    const isOverCard = over.data.current?.type === 'CardType'

    if (activeCardId === overCardId) return;
    if (!isActiveCard) return;

    if (isActiveCard && isOverCard) {
      const activeCardIndex = cards.findIndex(
        (card) => card.card_id === activeCardId
      );
  
      const overCardIndex = cards.findIndex(
        (card) => card.card_id === overCardId
      )

      setCards((cards) => {

        cards[activeCardIndex].col_id = cards[overCardIndex].col_id

        return arrayMove(cards, activeCardIndex, overCardIndex)
      })
    }

    const isAcrossCategory = over.data.current?.type === 'CategoryType'

    if (isActiveCard && isAcrossCategory) {
      setCards((cards) => {
        const activeCardIndex = cards.findIndex(
          (card) => card.card_id == activeCardId
        );
        
        cards[activeCardIndex].col_id = overCardId

        return arrayMove(cards, activeCardIndex, activeCardIndex)
      })
    }
  } 


  return (
  <div>
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} sensors={sensors}>
      <div className=" m-auto flex flex-row gap-4">
        <div className=" flex flex-row grap-4 gap-4" >
          <SortableContext items={categorysId}>
            {categorys.map((category) => (
              <Category 
              key={category.col_id} 
              category={category} 
              deleteCategory={deleteCategory}
              createCard={createCard}
              cards={cards.filter((card) => card.col_id === category.col_id)}
              deleteCard={deleteCard}
              />
            ))}
          </SortableContext>
        </div>
        <button onClick={categoryModalOpen}
        className="
        h-[60px]
        border-2 rounded-lg p-2 
        bg-orange-200 border-orange-400 
        cursor-pointer shadow-custom active:shadow-none active:scale-95 focus:outline-none
        select-none
        ">
          カテゴリの追加
        </button>
      </div>

    </DndContext>
    {isCategoryModal && 
    <div>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <form onSubmit={handleSubmit(onsubmit)}>
            <div>
                <label htmlFor="inputData">タイトル</label><br/>
                <input id="inputData" type="text" {...register("inputData",{
                    required: "タイトルは必須です",
                })} 
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-500 focus:ring-2" />
                {errors.inputData && <div >{errors.inputData.message}</div>}
            </div>
            <button type="submit" className="w-20 px-4 py-2 bg-blue-500 text-white rounded" disabled={ !isDirty || !isValid}>送信</button>
          </form>
          <div className="">
            <button onClick={categoryModalClose} className="w-20 px-4 py-2 bg-blue-500 text-white rounded">閉じる</button>
          </div>
        </div>
      </div>
    </div>}    
  </div>
  )
}
export default Board;



