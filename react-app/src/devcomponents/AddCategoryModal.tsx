import { FC, useState } from "react";
import { v4 as uuid } from "uuid";
import { CategoryType } from "../utilities/ttypes";

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
    // テキストボックスの状態を管理するための状態変数とセッター関数
    const [colName, setColName] = useState("");

    const addCategory = () => {
        setCategories((currentCategories) => [
            ...currentCategories,
            {
                id: "category-" + uuid(),
                col_pos: currentCategories.length,
                col_name: colName,
                description: "", // ここを必要に応じて更新
            },
        ]);
        closeAddCategory();
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <input
                        type="text"
                        value={colName}
                        onChange={(e) => setColName(e.target.value)}
                        className="w-full p-2 border-2 rounded-md mb-4"
                        placeholder="カテゴリ名を入力"
                    />
                    <div className="mt-3 flex justify-center space-x-12">
                        <button
                            onClick={addCategory}
                            className="w-20 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            追加
                        </button>
                        <button
                            onClick={closeAddCategory}
                            className="w-20 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AddCategoryModal;
