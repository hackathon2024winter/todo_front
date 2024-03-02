import { FC, useState } from "react";
import { CardType } from "../utilities/ttypes";
import { DraggableHandle, DraggableItem } from "./DraggableComponents";
import EditCardModal from "./EditCardModal";

interface CardProps {
    card: CardType;
    className?: string;
    setCards: (updateFunc: (cards: CardType[]) => CardType[]) => void;
    cards: CardType[];
    setDelCard: (cards: CardType) => void;
}

const Card: FC<CardProps> = ({
    card,
    className,
    setCards,
    cards,
    setDelCard,
}) => {
    // カテゴリ追加の表示状態を管理するstate
    const [isEditCardModal, setEditCardModal] = useState(false);

    const today = new Date().toISOString().split("T")[0];

    const deleteCard = (id: string | number) => {
        setCards((cards) => {
            return cards.filter((card) => card.id !== id);
        });

        const delCard = cards.find((card) => card.id === id);
        if (delCard) {
            setDelCard(delCard);
        }
    };

    // カテゴリ追加を開く関数
    const openEditCard = () => {
        setEditCardModal(true);
    };

    // カテゴリ追加を閉じる関数
    const closeEditCard = () => {
        setEditCardModal(false);
    };

    return (
        <>
            <DraggableItem id={card.id}>
                <div className={className} onClick={openEditCard}>
                    <div className="flex justify-between items-center p-1">
                        <DraggableHandle
                            id={card.id}
                            imgPath={
                                card.due_date &&
                                (today >= card.due_date
                                    ? "/exclamation-icon.svg"
                                    : "/drag-handle-corner-svgrepo-com.svg")
                            }
                        >
                            {card.card_name}
                        </DraggableHandle>
                    </div>
                    <button
                        onClick={() => {
                            deleteCard(card.id);
                        }}
                    >
                        <div className="w-5 h-5">
                            <img src={"/trash-icon.svg"} alt="Description" />
                        </div>
                    </button>
                </div>
            </DraggableItem>
            {isEditCardModal && (
                <EditCardModal
                    card={card}
                    closeEditCard={closeEditCard}
                    setCards={setCards}
                />
            )}
        </>
    );
};

export default Card;
