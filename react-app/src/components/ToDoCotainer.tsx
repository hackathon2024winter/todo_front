import { FC, useState } from "react"
import Droppable from "./Droppable"
import { ToDoContainerItem } from "../utilities/types"
import classNames from "classnames"

const ToDoContainer: FC<ToDoContainerItem> = (props) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <Droppable
      id={props.id}
      onIsOverChange={setIsOver} // setIsOverとonIsOverChangeを一致させると、引数を伝搬させられる。
      className={
        classNames(
          "p-0.5 w-52 h-72 gap-4 border-black border-solid border flex flex-col overflow-x-auto ",
          { 'bg-green-300': isOver, 'bg-orange-200': !isOver })
      }
    >
      <span className="font-bold">
        ドロップエリア
      </span>

      {props.children}
    </Droppable>
  )
}

export default ToDoContainer

