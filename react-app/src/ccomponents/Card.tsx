import { FC } from "react";
import { CardType } from "../utilities/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"

type Props ={
    card: CardType,
    deleteCard: (card_id: string) => void;
}

const Card: FC<Props> = (props) => {
    const {card, deleteCard, } = props;

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
        <div className="bg-rose-300 my-2 mx-1 py-2 flex flex-row justify-between"
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
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
    )
}
export default Card;