import { FC } from "react";
import { ToDoItem } from "../utilities/types";
import Draggable from "./Draggable";

const Todo: FC<{ item: ToDoItem }> = ({ item }) => {

  return (<>

    <Draggable key={item.card_id} id={Number(item.card_id)}>

      <div className="m-1 rounded-lg bg-blue-400">
          <div className="ml-2 bg-white border-t-2 border-r-2 border-b-2 border-gray-400 rounded-r-lg p-2">
          {item.card_name}
          </div>
      </div>
    </Draggable>
  </>)
}

export default Todo;