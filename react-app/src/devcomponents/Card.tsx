import { FC } from "react";
import { DraggableHandle, DraggableItem } from "./DraggableComponents";
import { CardType } from "../utilities/ttypes";

interface CardProps {
    card: CardType;
    className?: string;
    setCards: (updateFunc: (cards: CardType[]) => CardType[]) => void;
}

const Card: FC<CardProps> = ({ card, className, setCards }) => {

    const deleteCard = (id: string | number) => {
        setCards((cards) => {
            return cards.filter((card) => card.id !== id);
        });
    };

    return (
        <>
            <DraggableItem id={card.id}>
                <div className={className}>
                    <div className="flex justify-between items-center p-1">
                        <DraggableHandle
                            id={card.id}
                            children={card.card_name}
                            imgPath={"/drag-handle-corner-svgrepo-com.svg"}
                        />
                        <button
                            onClick={() => {
                                deleteCard(card.id);
                            }}
                        >
                            ✖️
                        </button>
                    </div>
                </div>
            </DraggableItem>
            {/* {isAddCardModal && (
                <AddCardModal
                    categoryId={category.id}
                    closeAddCard={closeAddCard}
                    setCards={setCards}
                />
            )} */}
        </>
    );
};

export default Card;
