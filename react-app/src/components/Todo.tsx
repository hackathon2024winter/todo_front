import { FC } from "react";
import { ToDoProp } from "../utilities/types";
import Draggable from "./Draggable";

const Todo: FC<ToDoProp> = (todoProp) => {
  const todo = { ...todoProp }
  console.log(todo)

  return (<>

    <Draggable key={todo.card_id} id={Number(todo.card_id)} children={
      <div className="mb-2">
        <div
          className="w-fit h-fit p-4 m-2 border-2 rounded-lg border-green-900 bg-green-500 select-none"
        >
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
            onClick={() => console.log(todo.description)}
          >
            {todo.card_name}
          </button>
        </div>
      </div>
    } />

  </>)
}

export default Todo;