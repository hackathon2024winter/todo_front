import { FC, useState } from "react"
import Droppable from "./Droppable"
import { ToDoContainerItem } from "../utilities/types"
import classNames from "classnames"

const ToDoContainer: FC<ToDoContainerItem> = (props) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <Droppable
      id={props.col_id}
      onIsOverChange={setIsOver} // setIsOverとonIsOverChangeを一致させると、引数を伝搬させられる。
      className={
        classNames(
          "p-0.5 w-52 h-72 gap-1 border-orange-400 border-2 rounded-lg flex flex-col overflow-x-auto ",
          { 'bg-green-300': isOver, 'bg-orange-200': !isOver })
      }
    >
      <span className="font-bold">
        {props.col_name}
      </span>

      {props.children}
    </Droppable>
  )
}

export default ToDoContainer
