import { FC, useCallback, useEffect, useState } from "react";
import { CardType, CategoryType } from "../utilities/ttypes";
import {
    DraggableHandle,
    DraggableItem,
    DraggableList,
} from "./DraggableComponents";
import AddCardModal from "./AddCardModal";
import { DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Card from "./Card";

// CategoryPropsに渡すべきプロパティを集約する。
interface CategoryProps {
    category: CategoryType;
    className?: string;
    setCategories: (
        updateFunc: (categories: CategoryType[]) => CategoryType[]
    ) => void;
    setCards: (updateFunc: (cards: CardType[]) => CardType[]) => void;
    cards: CardType[];
}

const Category: FC<CategoryProps> = ({
    category,
    className,
    setCategories,
    setCards,
    cards,
}) => {
    // カテゴリ追加の表示状態を管理するstate
    const [isAddCardModal, setAddCardModal] = useState(false);
    const [draggedCard, setdraggedCard] = useState<CardType | null>(null);

    const onDragStart = useCallback(
        (e: DragStartEvent) => {
            const { active } = e;
            const activeCard = cards.find((card) => card.id === active.id);
            console.log(cards);
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
                setCards((currentCards) => {
                    const oldIndex = currentCards.findIndex(
                        (card) => card.id === active.id
                    );
                    const newIndex = currentCards.findIndex(
                        (card) => card.id === over?.id
                    );

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

    const deleteCategory = (id: string | number) => {
        setCategories((categories) => {
            return categories.filter((category) => category.id !== id);
        });
    };

    return (
        <>
            <DraggableItem id={category.id}>
                <div className={className}>
                    <div className="flex justify-between items-center p-2">
                        <DraggableHandle
                            id={category.id}
                            children={category.col_name}
                            imgPath={"/drag-handle-dots-1-svgrepo-com.svg"}
                        />
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
                        items={cards.filter(card => card.col_id === category.id)}
                        layout="grid"
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                    >
                        <div className=" gap-4">
                            {cards.map((card) =>
                                card.col_id === category.id && (
                                    <div key={card.id} className="">
                                        <Card
                                            card={card}
                                            className={
                                                "bg-rose-300 my-1 mx-1 flex flex-row justify-between"
                                            }
                                            setCards={setCards}
                                        />
                                    </div>
                                ))}
                        </div>
                    </DraggableList>
                </div>
                {/* <DragOverlay>
                    {draggedCard ? (
                        <Card
                            card={draggedCard}
                            className={
                                "bg-rose-300 my-1 mx-1 flex flex-row justify-between"
                            }
                            setCards={setCards}
                        />
                    ) : null}
                </DragOverlay> */}
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

export default Category;
