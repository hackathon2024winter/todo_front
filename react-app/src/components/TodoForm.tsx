
import React, { useState } from "react";
import { Todo } from "./Item";

type TodoFormProps = {
    addTodoOnclick: (todo: Todo) => void;
    todoItemList: Todo[];
};

const TodoForm = (props: TodoFormProps): JSX.Element => {
    const [formTodo, setFormTodo] = useState<Todo>({
        card_id: 1,
        card_position: 1,
        col_id: 1,
        col_position: 1,
        col_name: "未着手",
        title: "タイトルを入力",
        content: "内容を入力",
        border_Color: "border-red-500",
    });

    const findMaxCardId = () => {
        // todoItemList から最大の card_id を見つける
        const maxCardId = Math.max(
            ...props.todoItemList.map((todo) => todo.card_id),
            0
        );
        return maxCardId;
    };

    const handlerAddTodoOnclick = () => {
        const newTodo = { ...formTodo, card_id: findMaxCardId() + 1 };
        props.addTodoOnclick(newTodo);
        setFormTodo({
            card_id: findMaxCardId() + 2, // 新しいフォームの card_id も更新
            card_position: 1,
            col_id: 1,
            col_position: 1,
            col_name: "未着手",
            title: "タイトルを入力",
            content: "内容を入力",
            border_Color: "border-red-500",
        });
    };

    const handlerTodoTitleFormOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newTodo = { ...formTodo };
        newTodo.title = event.target.value;
        setFormTodo(newTodo);
    };

    const handlerTodoContentFormOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newTodo = { ...formTodo };
        newTodo.content = event.target.value;
        setFormTodo(newTodo);
    };

    const handlerTodobgColorFormOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newTodo = { ...formTodo };
        newTodo.border_Color = event.target.value;
        setFormTodo(newTodo);
    };

    return (
        <div className="w-100 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="m-2">
                    <label className="text-gray-400">タイトル</label>
                    <input
                        type="text"
                        value={formTodo.title}
                        onChange={handlerTodoTitleFormOnChange}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="m-2">
                    <label className="text-gray-400">内容</label>
                    <input
                        type="text"
                        value={formTodo.content}
                        onChange={handlerTodoContentFormOnChange}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="m-2">
                    <label className="text-gray-400">色</label>
                    <div className="flex items-center me-4">
                        <input
                            checked={formTodo.border_Color === "border-red-500"}
                            id="red-checkbox"
                            type="checkbox"
                            value="border-red-500"
                            onChange={handlerTodobgColorFormOnChange}
                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="red-checkbox"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Red
                        </label>
                    </div>
                    <div className="flex items-center me-4">
                        <input
                            checked={formTodo.border_Color === "border-green-500"}
                            id="green-checkbox"
                            type="checkbox"
                            value="border-green-500"
                            onChange={handlerTodobgColorFormOnChange}
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="green-checkbox"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Green
                        </label>
                    </div>
                    <div className="flex items-center me-4">
                        <input
                            checked={formTodo.border_Color === "border-purple-500"}
                            id="purple-checkbox"
                            type="checkbox"
                            value="border-purple-500"
                            onChange={handlerTodobgColorFormOnChange}
                            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="purple-checkbox"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Purple
                        </label>
                    </div>
                    <div className="flex items-center me-4">
                        <input
                            checked={formTodo.border_Color === "border-blue-500"}
                            id="teal-checkbox"
                            type="checkbox"
                            value="border-blue-500"
                            onChange={handlerTodobgColorFormOnChange}
                            className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="teal-checkbox"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Blue
                        </label>
                    </div>
                    <div className="flex items-center me-4">
                        <input
                            checked={formTodo.border_Color === "border-yellow-500"}
                            id="yellow-checkbox"
                            type="checkbox"
                            value="border-yellow-500"
                            onChange={handlerTodobgColorFormOnChange}
                            className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="yellow-checkbox"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Yellow
                        </label>
                    </div>
                    <div className="flex items-center me-4">
                        <input
                            checked={formTodo.border_Color === "border-pink-500"}
                            id="orange-checkbox"
                            type="checkbox"
                            value="border-pink-500"
                            onChange={handlerTodobgColorFormOnChange}
                            className="w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="orange-checkbox"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Pink
                        </label>
                    </div>
                </div>
                <div className="m-2">
                    <button
                        onClick={handlerAddTodoOnclick}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        TODO追加
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;