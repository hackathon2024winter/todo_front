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
    const today = new Date().toISOString().split('T')[0];

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
                            imgPath={
                                card.due_date &&
                                (today >= card.due_date ?
                                    "/exclamation-icon.svg" :
                                    "/drag-handle-corner-svgrepo-com.svg")
                            }
                        >
                            {card.card_name}
                        </DraggableHandle>
                    </div>
                    <button onClick={() => { deleteCard(card.id); }}                    >
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






// <>
// <div className={classnames("my-2", "mx-1", "py-2", "bg-[#F0EFEE]", "flex", "flex-row", 
//                              "justify-between", "items-center", "rounded-sm", 
//                                  card.color === "red" ? "border-l-[18px] border-solid border-PoulRed" : 
//                                      card.color === "blue" ? "border-l-[18px] border-solid border-PoulBlue" : 
//                                          card.color === "yellow" ? "border-l-[18px] border-solid border-PoulYellow" :
//                                               "bg-white")}
//   ref={setNodeRef}
//   style={style}
//   {...listeners}
//   {...attributes}
//   onClick={CardDetailModalOpen}
// >
//   <div className="pl-2 flex flex-row ">
//     {card.due_date && (
//       today >= Date.parse(card.due_date) ? <div className="pt-0.5"><ExclamationIcon /></div> : ""
//     )}
//     <div className={classnames(" text-lg", "pl-1", today >= Date.parse(card.due_date) ? "text-[#E57637]" : "text-PoulIndigo")}>
//       {card.card_name}
//     </div>
//   </div>
//   <button className="pr-2" onClick={() => { deleteCard(card.card_id) }}>
//     <TrashIcon />
//   </button>
// </div>
// {isCardDetailModal && (
//   <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
//     <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//       <h2 className="text-black">カード詳細</h2>
//       <div className="text-black ">
//         {card.card_name}
//       </div>
//       <div className="text-black">
//         {card.description}
//       </div>
//       <button className="w-20 px-4 py-2 bg-blue-500 text-white rounded" onClick={CardDetailModalClose}>
//         閉じる
//       </button>
//     </div>
//   </div>
// )}
// </>