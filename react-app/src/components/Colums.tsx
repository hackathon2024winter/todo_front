import { useState } from "react";
import TodoListForm, { ColumnType } from "./TodoListForm";

const ColumnListForm = (): JSX.Element => {
    const [columnList, setColumnList] = useState<ColumnType[]>([
        {
            col_id: 1,
            col_position: 1,
            col_name: "未着手",
            cards: [
                {
                    card_id: 1,
                    card_position: 1,
                    col_id: 1,
                    col_position: 1,
                    col_name: "未着手",
                    title: "タイトル",
                    content: "TODO内容はここに記載します。",
                    border_Color: "border-green-500",
                },
                {
                    card_id: 2,
                    card_position: 2,
                    col_id: 1,
                    col_position: 1,
                    col_name: "未着手",
                    title: "タイトル2",
                    content: "TODO内容の二番目",
                    border_Color: "border-pink-500",
                },
            ],
        },
        {
            col_id: 2,
            col_position: 2,
            col_name: "着手中",
            cards: [
                {
                    card_id: 3,
                    card_position: 1,
                    col_id: 2,
                    col_position: 2,
                    col_name: "着手中",
                    title: "タイトル3",
                    content: "TODO内容の3番目",
                    border_Color: "border-red-500",
                },
            ],
        },
    ]);

    return (
        <>
            <div className="w-100">
                <h1 className="text-xl font-bold text-green-400">Hello World</h1>
                <div className="my-5 flex">
                    {columnList.map((column) => {
                        return <TodoListForm key={column.col_id} {...column} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default ColumnListForm;

