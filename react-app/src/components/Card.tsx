import { FC, useState } from "react";
import { CardType } from "../utilities/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import classnames from "classnames"
import TrashIcon from "./icon/TrashIcon";
import ExclamationIcon from "./icon/ExclamationIcon";

type Props = {
  card: CardType;
  deleteCard: (card_id: string) => void;
};

const Card: FC<Props> = (props) => {
  const { card, deleteCard, } = props;

  const beforeToday = new Date()
  const year = String(beforeToday.getFullYear())
  const month = String(beforeToday.getMonth() + 1);
  const date = String(beforeToday.getDate())

  const today = Date.parse(year + "/" + month + "/" + date)



  const [isCardDetailModal, setCardDetailModal] = useState<boolean>(false);

  const CardDetailModalOpen = () => {
    setCardDetailModal(true);
  };

  const CardDetailModalClose = () => {
    setCardDetailModal(false);
  };

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: card.card_id,
      data: {
        type: "CardType",
        card,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <div className={classnames("my-2", "mx-1", "py-2", "bg-[#F0EFEE]", "flex", "flex-row", "justify-between", "items-center", "rounded-sm", card.color === "red" ? "border-l-[18px] border-solid border-PoulRed" : card.color === "blue" ? "border-l-[18px] border-solid border-PoulBlue" : card.color === "yellow" ? "border-l-[18px] border-solid border-PoulYellow" : "bg-white")}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onClick={CardDetailModalOpen}
      >
        <div className="pl-2 flex flex-row ">
          {card.due_date && (
            today >= Date.parse(card.due_date) ? <div className="pt-0.5"><ExclamationIcon /></div> : ""
          )}
          <div className={classnames(" text-lg", "pl-1", today >= Date.parse(card.due_date) ? "text-[#E57637]" : "text-PoulIndigo")}>
            {card.card_name}
          </div>
        </div>
        <button className="pr-2" onClick={() => { deleteCard(card.card_id) }}>
          <TrashIcon />
        </button>
      </div>
      {isCardDetailModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h2 className="text-black">カード詳細</h2>
            <div className="text-black ">
              {card.card_name}
            </div>
            <div className="text-black">
              {card.description}
            </div>
            <button className="w-20 px-4 py-2 bg-blue-500 text-white rounded" onClick={CardDetailModalClose}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  )
}
export default Card;
