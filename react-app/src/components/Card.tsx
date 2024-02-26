import { FC, useState } from "react";
import { CardType } from "../utilities/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"

type Props ={
    card: CardType,
    deleteCard: (card_id: string) => void;
}

const Card: FC<Props> = (props) => {
    const {card, deleteCard, } = props;

    const [isCardDetailModal, setCardDetailModal] = useState<boolean>(false);

    const CardDetailModalOpen = () => {
        setCardDetailModal(true);
    };
    
    const CardDetailModalClose = () => {
        setCardDetailModal(false);
    };

    const {setNodeRef, attributes, listeners, transform, transition} = useSortable({
        id: card.card_id,
        data: {
            type: "CardType",
            card
        }
    });

    const style ={
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <>
            <div className="bg-rose-300 my-2 mx-1 py-2 flex flex-row justify-between"
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
                onClick={CardDetailModalOpen}
            >
                <div className="text-black ">
                    {card.card_name}
                </div>
                <button className="" onClick={() => {
                    deleteCard(card.card_id)
                }}>
                    ✖️
                </button>
            </div>
            {isCardDetailModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h2 className="text-black">カード詳細</h2>
                        <div className="text-black">
                            {card.card_name}
                        </div>
                        <div className="text-black">
                            {card.description}
                        </div>
                        <button className="w-20 px-4 py-2 bg-blue-500 text-white rounded"onClick={CardDetailModalClose}>
                            閉じる
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
export default Card;