import { FC, useCallback, useEffect, useState } from "react";
import { CardType, CategoryType } from "../utilities/ttypes";
import { DraggableHandle, DraggableItem, DraggableList } from "./DraggableComponents";
import AddCardModal from "./AddCardModal";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

// CategoryPropsに渡すべきプロパティを集約する。
interface CategoryProps {
    category: CategoryType;
    className?: string;
    deleteCategory: (id: string | number) => void;
    setCards: (updateFunc: (cards: CardType[]) => CardType[]) => void;
    cards: CardType[]
}

const Category: FC<CategoryProps> = ({
    category,
    className,
    deleteCategory,
    setCards,
    cards
}) => {
    // カテゴリ追加の表示状態を管理するstate
    const [isAddCardModal, setAddCardModal] = useState(false);
    const [draggedCard, setdraggedCard] = useState<CardType | null>(
        null
    );

    useEffect(() => {
        console.log(cards)
    }, [cards])

    const onDragStart = useCallback(
        (e: DragStartEvent) => {
            const { active } = e;
            const activeCard = cards.find(
                (card) => card.id === active.id
            );
            setdraggedCard(activeCard || null);
        },
        [cards]
    );

    const onDragEnd = useCallback(
        (e: DragEndEvent) => {
            const { active, over } = e;
            setdraggedCard(null);

            // `active`がドラッグされた要素、`over`がドロップされた要素
            if (active.id !== over?.id) {
                setCards(currentCards => {
                    const oldIndex = currentCards.findIndex((card) => card.id === active.id);
                    const newIndex = currentCards.findIndex((card) => card.id === over?.id);

                    // `arrayMove`で新しい配列を作成
                    return arrayMove(currentCards, oldIndex, newIndex);
                });
            }
        },
        [setCards]
    );

    // カテゴリ追加を開く関数
    const openAddCard = () => {
        setAddCardModal(true);
    };

    // カテゴリ追加を閉じる関数
    const closeAddCard = () => {
        setAddCardModal(false);
    };

    return (
        <>
            <DraggableItem id={category.id}>
                <div className={className} >
                    <div className="flex justify-between items-center p-2">
                        <DraggableHandle id={category.id} children={category.col_name} />
                        <button
                            onClick={() => {
                                deleteCategory(category.id);
                            }}
                        >
                            ✖️
                        </button>
                    </div>

                    <button className="text-black text-sm" onClick={openAddCard}>
                        ＋カードの追加
                    </button>

                    <DraggableList<CardType>
                        items={cards}
                        layout="grid"
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                    >
                        <div className=" gap-4">
                            {cards.map((card) => (

                                <div key={card.id} className="">



                                </div>
                            ))}

                        </div>

                    </DraggableList>


                </div>
            </DraggableItem>
            {isAddCardModal && (
                <AddCardModal
                    categoryId={category.id}
                    closeAddCard={closeAddCard}
                    setCards={setCards}
                />
            )}
        </>

    );
};

export default Category


// setTodos((prevTodos) => {

//     // prevTodos が null の場合は、何もしない
//     if (prevTodos === null) return null;

//     //card_idがactive.idと一致するのtodoを抽出し、col_idをover.idに更新する。
//     const updatedItems = prevTodos.items.map((item) => {
//       return (item.card_id === active.id ? { ...item, col_id: Number(over.id) } : item);
//     });

//     // col_idを更新したtodo[]をtodosに戻す。
//     return { ...prevTodos, items: updatedItems };
//   });
// }