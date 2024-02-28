import { FC, useState } from "react";
import { CardType, CategoryType } from "../utilities/ttypes";
import {
    DraggableHandle,
    DraggableItem,
    DraggableList,
} from "./DraggableComponents";

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

    // カテゴリ追加を開く関数
    const openAddCard = () => {
        setAddCardModal(true);
    };

    // カテゴリ追加を閉じる関数
    // const closeAddCard = () => {
    //     setAddCardModal(false);
    // };

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
                        items={cards.filter((card) => card.col_id === category.id)}
                        layout="grid"
                    >
                        <div className=" gap-4">
                            {cards.map((card) => (
                                <div key={card.id} className="">
                                    {card.card_name}

                                    {/* <Card
                                    card={card}
                                    className={
                                        "bg-rose-300 my-1 mx-1 flex flex-row justify-between"
                                    }
                                    setCards={setCards}
                                /> */}
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
                // <AddCardModal
                //     categoryId={category.id}
                //     closeAddCard={closeAddCard}
                //     setCards={setCards}
                // />

                <div>
                    AddCardModal
                </div>
            )}
        </>
    );
};

export default Category;
