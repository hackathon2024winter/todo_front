import { FC, useState } from "react";
import { CardType, CategoryType, DndItemType } from "../utilities/ttypes";
import {
    DraggableHandle,
    DraggableItem,
    DraggableList,
} from "./DraggableComponents";
import Card from "./Card";
import AddCardModal from "./AddCardModal";

interface CategoryProps {
    category: CategoryType;
    className?: string;
    setCategories: (
        updateFunc: (categories: CategoryType[]) => CategoryType[]
    ) => void;
    setCards: (updateFunc: (cards: CardType[]) => CardType[]) => void;
    cards: CardType[];
    draggedDnd?: DndItemType;
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
                            imgPath={"/drag-handle-corner-svgrepo-com.svg"}
                        />
                        <button
                            onClick={() => {
                                deleteCategory(category.id);
                            }}
                        >
                            <div className="w-6 h-6">
                                <img src={"/trash-icon.svg"} alt="Description" />
                            </div>
                        </button>
                    </div>
                    <button className="text-black text-sm" onClick={openAddCard}>
                        <div className="flex justify-between">
                            <div className="w-6 h-6">
                                <img src={"/add-icon.svg"} alt="Description" />
                            </div>
                            <div className="mt-0.5 ml-1">
                                カードの追加
                            </div>

                        </div>

                    </button>

                    <DraggableList<CardType>
                        items={cards.filter((card) => card.col_id === category.id)}
                        layout="grid"
                    >
                        <div className=" gap-4">
                            {cards.map((card) => (
                                card.col_id === category.id && (

                                    <div key={card.id} className="">
                                        <Card
                                            card={card}
                                            className={
                                                "bg-rose-300 my-1 mx-1 pr-2 flex flex-row justify-between"
                                            }
                                            setCards={setCards}
                                        />
                                    </div>
                                )
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

export default Category;
