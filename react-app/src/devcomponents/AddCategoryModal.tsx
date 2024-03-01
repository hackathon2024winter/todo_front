import { FC } from "react";
import { v4 as uuid } from "uuid";
import { CategoryFormType, CategoryType } from "../utilities/ttypes";
import { useForm } from "react-hook-form";

export interface AddCategoryModalProps {
    setCategories: (
        updateFunc: (categories: CategoryType[]) => CategoryType[]
    ) => void;
    closeAddCategory: () => void;
}

const AddCategoryModal: FC<AddCategoryModalProps> = ({
    setCategories,
    closeAddCategory,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryFormType>();

    const addCategory = (data: CategoryFormType) => {
        setCategories((currentCategories) => [
            ...currentCategories,
            {
                id: "category-" + uuid(),
                col_pos: currentCategories.length,
                col_name: data.col_name,
                description: "",
            },
        ]);
        closeAddCategory();
    };

    return (
        <div>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="relative top-20 mx-auto p-5 max-w-sm border shadow-lg rounded-md bg-white">
                    <div className="flex justify-between mb-3">
                        <div className="text-black text-lg text-center grow ">
                            カテゴリの追加
                        </div>
                        <button onClick={closeAddCategory} className="">
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
                    <form onSubmit={handleSubmit(addCategory)}>
                        <div className="mb-3 text-center">
                            <input
                                id="col_name"
                                type="text"
                                placeholder="カテゴリ名を入力 (必須)"
                                {...register("col_name", { required: "カテゴリ名は必須です", })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-500 focus:ring-2"
                                style={{ width: '300px' }}
                            />
                            {errors.col_name && (
                                <div className="text-black">{errors.col_name.message}</div>
                            )}
                        </div>
                        <div className="mb-3 text-center">
                            <input
                                id="description"
                                type="text"
                                placeholder="カテゴリ名の説明 (任意)"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-500 focus:ring-2"
                                style={{ width: '300px' }}
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
export default AddCategoryModal;

