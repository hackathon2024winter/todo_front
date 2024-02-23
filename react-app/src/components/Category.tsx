import { CardType, CategoryType, CardFormType } from "../utilities/types";
import { FC, useMemo, useState } from "react"
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import Card from "./Card";
import { useForm } from "react-hook-form";
import classNames from "classnames";


type Props = {
    category: CategoryType,
    deleteCategory: (col_id: string | number) => void,

    cards: CardType[],
    createCard: (card_id: string, col_id: string) => void,
    deleteCard: (card_id: string) => void,
}

const Category: FC<Props> = (props)=> {
    const {category, deleteCategory, createCard, cards, deleteCard} = props;

    const [isCardModal, setCardModal] = useState<boolean>(false);

    const cardsId = useMemo(() => {
        return cards.map((card) => card.card_id)
    }, [cards])

    const {setNodeRef, attributes, listeners, transform, transition} = useSortable({
        id: category.col_id,
        data: {
            type: "CategoryType",
            category
        }
    });

    const style ={
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const cardModalOpen = () => {
        setCardModal(true)
    }
    
    const cardModalClose = () => {
        setCardModal(false)
    }

    const {register, handleSubmit, formState: {errors, isDirty,  isValid}} = useForm<CardFormType>();

    const onsubmit = (data: CardFormType) => {
        const card_name = data.inputData
        createCard(card_name, category.col_id)
    }

    return(
        <div 
            ref={setNodeRef}
            style={style}
            className="
            bg-[#ECDED5]
            w-[230px]
            h-[300px]
            max-h-[500px]
            rounded-md

        ">
            <div className="
            flex 
            flex-row 
            justify-between  
            border-b-4
            border-b-[#E2B49A]">
                <div 
                    {...listeners}
                    {...attributes}
                    className="
                    text-[#183346]
                    
                ">
                    {category.col_name}
                </div>
                <button 
                onClick={() => {
                    deleteCategory(category.col_id)
                }}
                className="">
                    ✖️
                </button>
            </div>
            
            <button className="text-black text-sm" onClick={cardModalOpen}>
                ＋カードの追加
            </button>
            <div>
                <SortableContext items={cardsId}>
                    {cards.map((card) => (
                        <Card key={card.card_id} card={card} deleteCard={deleteCard}/>
                    ))}
                </SortableContext>
            </div>
            {isCardModal && 
                <div>
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div>
                            <label htmlFor="inputData">タイトル</label><br/>
                            <input id="inputData" type="text" {...register("inputData",{
                                required: "タイトルは必須です",
                            })} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-500 focus:ring-2" />
                            {errors.inputData && <div >{errors.inputData.message}</div>}
                        </div>
                        <button type="submit" className="w-20 px-4 py-2 bg-blue-500 text-white rounded" disabled={ !isDirty || !isValid}>送信</button>
                    </form>
                    <div className="">
                        <button onClick={cardModalClose} className="w-20 px-4 py-2 bg-blue-500 text-white rounded">閉じる</button>
                    </div>
                    </div>
                </div>
            </div>}    
        </div>
    )
}

export default Category;