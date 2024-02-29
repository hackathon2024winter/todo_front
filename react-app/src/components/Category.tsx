import { FC, useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardType, CardFormType, CategoryType, cardColorForm} from "../utilities/types";
import Card from "./Card";
import { Controller, useForm } from "react-hook-form";
import Select, {StylesConfig} from "react-select";
import TrashIcon from "./icon/TrashIcon";

type Props = {
  category: CategoryType;
  deleteCategory: (col_id: string) => void;
  cards: CardType[];
  createCard: (card_name: string, col_id: string, card_description: string, due_date: string, card_color: string) => void;
  deleteCard: (card_id: string) => void;
};

const Category: FC<Props> = (props) => {
  const { category, deleteCategory, createCard, cards, deleteCard } = props;
  const [isCardModal, setCardModal] = useState<boolean>(false);

  const cardsId = useMemo(() => {
    return cards.map((card) => card.card_id);
  }, [cards]);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: category.col_id,
      data: {
        type: "CategoryType",
        category,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const cardModalOpen = () => {
    setCardModal(true);
  };

  const cardModalClose = () => {
    setCardModal(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,},
    control,
  } = useForm<CardFormType>();

  const options: Array<cardColorForm> = [
    {value: "red", label: "赤", primaryColor: "#E39C74", secondaryColor: "#FaDCD0"},
    {value: "blue", label: "青", primaryColor: "#97BDD3", secondaryColor: "#D3ECF3"},
    {value: "yellow", label: "黄", primaryColor: "#E2B856", secondaryColor: "#FAE9C2"}
  ]

  const colorStyles: StylesConfig<cardColorForm> ={
    control: (styles) => ({...styles, 
      backgroundColor: 'white',
      borderRadius: '7px',
      border: '1px solid gray',
    }),
    option: (style, {data, isFocused, isSelected}) => {
      return {
        ...style, 
        backgroundColor: isSelected ? data.primaryColor : isFocused ? data.secondaryColor : "#FFFFFF",
        color: isSelected ? "#FFFFFF" : data.primaryColor ,

        ':active' : {
          ...style[':active'],
          backgroundColor:isSelected ? data.primaryColor: data.secondaryColor,
        }
      }
    }
  }

  const onsubmit = (data: CardFormType) => {
    cardModalClose()
    reset()

    const beforeDueDate = data.dueDate

    const cardName = data.cardName
    const columnId = category.col_id
    const cardDescription = data.cardDescription
    const dueDate = beforeDueDate.replace(/-/g, '/')
    const cardColor = data.cardColor

    createCard(cardName, columnId, cardDescription, dueDate, cardColor);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
            bg-[#ECDED5]
            w-[230px]
            h-[300px]
            max-h-[500px]
            rounded-md
            ml-4
        "
    >
      <div
        className="
            flex 
            flex-row 
            justify-between  
            border-b-4
            border-b-[#E2B49A]"
      >
        <div
          {...listeners}
          {...attributes}
          className="text-black text-xl py-2 px-3"
        >
          {category.col_name}
        </div>
        <button
          onClick={() => {
            deleteCategory(category.col_id);
          }}
          className="pr-3"
        >
          <TrashIcon />
        </button>
      </div>
      
      <button className="text-black text-sm flex items-center pt-1 ml-1" onClick={cardModalOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 black-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div className="pl-1">
          カードの追加
        </div>
      </button>
      <div>
        <SortableContext items={cardsId}>
          {cards.map((card) => (
            <Card key={card.card_id} card={card} deleteCard={deleteCard} />
          ))}
        </SortableContext>
      </div>
      {isCardModal && (
        <div>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="flex justify-between mb-3">
                <div className="text-black text-lg text-center grow ">
                  カードの追加
                </div>
                <button onClick={cardModalClose} className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit(onsubmit)}>
                <div>
                  <label htmlFor="cardName" className="text-black">カード名</label>
                  <input
                    id="cardName"
                    type="text"
                    {...register("cardName", {
                      required: "タイトルは必須です",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-400 focus:ring-2"
                  />
                  {errors.cardName && <div className="text-black">{errors.cardName.message}</div>}
                </div>
                <div>
                  <label htmlFor="cardDescription" className="text-black">カードの説明</label>
                  <input
                    id="cardDescription"
                    type="text"
                    {...register("cardDescription")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-400 focus:ring-2"
                  />
                </div>
                <div>
                  <label htmlFor="cardLimmitDate">カードの期限</label>
                  <input type="date"
                    {...register("dueDate",)}
                    className="text-white border-gray-300"
                  />
                </div>
                <div>
                  <Controller
                    control={control}
                    name="cardColor"
                    rules={{
                      required: "Please Select State.",
                    }}
                    render={({ field: { onChange, onBlur, value, name, ref } }) => (
                        <Select
                          name={name}
                          ref={ref}
                          styles={colorStyles}
                          onChange={(e) => {
                            onChange(e?.value);
                          }}
                          onBlur={onBlur}
                          value={options?.find((option) => option.value === value)}
                          options={options}
                          placeholder="カードの色の入力"
                          isSearchable={false}
                          components={{
                            IndicatorSeparator: () => null
                          }}
                        />
                    )}
                  />
                </div>
                <button
                  type="submit"
                  className="block ml-auto mr-auto m-2 rounded-lg bg-PoulBlue px-3 py-2 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-opacity-50 focus-visible:ring active:bg-gray-600 md:text-base"
                >
                  送信
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
