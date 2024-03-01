import { FC } from "react"
import { CardType } from "../utilities/ttypes";
import { DraggableHandle, DraggableItem } from "./DraggableComponents";

interface CardProps {
    card: CardType;
    className?: string;
    setCards: (updateFunc: (cards: CardType[]) => CardType[]) => void;
}

const Card: FC<CardProps> = ({
    card,
    className,
    setCards
}) => {
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
            {/* {isAddCardModal && (
                <AddCardModal
                    categoryId={category.id}
                    closeAddCard={closeAddCard}
                    setCards={setCards}
                />
            )} */}
        </>
    );
}

export default Card