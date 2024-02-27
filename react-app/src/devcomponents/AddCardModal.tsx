import { FC, useState } from "react";
import { v4 as uuid } from "uuid";
import { CardType } from "../utilities/ttypes"

export interface AddCardModalProps {
    categoryId: string
    setCards: (updateFunc: (cards: CardType[]) => CardType[]) => void;
    closeAddCard: () => void;
}

const AddCardModal: FC<AddCardModalProps> = ({
    categoryId,
    setCards,
    closeAddCard
}) => {
    const [cardName, setCardName] = useState("");

    const addCard = () => {
        setCards((currentCards) => [
            ...currentCards,
            {
                id: uuid(),
                card_pos: currentCards.length,
                col_id: categoryId,
                card_name: cardName,
                input_date: "string",
                due_date: "string",
                color: "string",
                description: "string",
            },
        ]);
        closeAddCard();
    };

    return (<>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full p-2 border-2 rounded-md mb-4"
                    placeholder="作業カード名"
                />
                <div className="mt-3 flex justify-center space-x-12">
                    <button
                        onClick={addCard}
                        className="w-20 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        追加
                    </button>
                    <button
                        onClick={closeAddCard}
                        className="w-20 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>

    </>)

}

export default AddCardModal