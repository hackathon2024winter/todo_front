import { FC } from "react";
import { v4 as uuid } from "uuid";
import { CardFormType, CardType, CardColorForm } from "../utilities/ttypes"
import { Controller, useForm } from "react-hook-form";
import Select, { StylesConfig } from "react-select";

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

    const options: Array<CardColorForm> = [
        { value: "red", label: "赤", primaryColor: "#E39C74", secondaryColor: "#FaDCD0" },
        { value: "blue", label: "青", primaryColor: "#97BDD3", secondaryColor: "#D3ECF3" },
        { value: "yellow", label: "黄", primaryColor: "#E2B856", secondaryColor: "#FAE9C2" }
    ]

    const colorStyles: StylesConfig<CardColorForm> = {
        control: (styles) => ({
            ...styles,
            backgroundColor: 'white',
            borderRadius: '7px',
            border: '1px solid gray',
        }),
        option: (style, { data, isFocused, isSelected }) => {
            return {
                ...style,
                backgroundColor: isSelected ? data.primaryColor : isFocused ? data.secondaryColor : "#FFFFFF",
                color: isSelected ? "#FFFFFF" : data.primaryColor,

                ':active': {
                    ...style[':active'],
                    backgroundColor: isSelected ? data.primaryColor : data.secondaryColor,
                }
            };
        }
    };

    const { register, handleSubmit, reset, formState: { errors, }, control, } = useForm<CardFormType>();

    const addCard = (data: CardFormType) => {
        closeAddCard();
        reset();
        setCards((currentCards) => [
            ...currentCards,
            {
                id: "card-" + uuid(),
                card_pos: currentCards.length,
                col_id: categoryId,
                card_name: data.card_name,
                input_date: "string",
                due_date: data.due_date,
                color: data.color,
                description: data.description,
            },
        ]);
    };

    return (
        <div>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <div className="flex justify-between mb-3">
                        <div className="text-black text-lg text-center grow ">
                            カードの追加
                        </div>
                        <button onClick={closeAddCard} className="">
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
                    <form onSubmit={handleSubmit(addCard)}>
                        <div>
                            <label htmlFor="card_name" className="text-black">カード名</label>
                            <input
                                id="card_name"
                                type="text"
                                {...register("card_name", {
                                    required: "タイトルは必須です",
                                })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-400 focus:ring-2"
                            />
                            {errors.card_name && <div className="text-black">{errors.card_name.message}</div>}
                        </div>
                        <div>
                            <label htmlFor="description" className="text-black">カードの説明</label>
                            <input
                                id="description"
                                type="text"
                                {...register("description")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-400 focus:ring-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="due_date">カードの期限</label>
                            <input type="due_date"
                                {...register("due_date",)}
                                className="text-white border-gray-300"
                            />
                        </div>
                        <div>
                            <Controller
                                control={control}
                                name="color"
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
    );
};

export default AddCardModal
