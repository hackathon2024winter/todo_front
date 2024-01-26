import { FC } from "react"
import Droppable from './Droppable'
import { DroppableProps } from "../utilities/types";

const Board: FC<DroppableProps> = ({ id, dragging, children }) => {

  return (<Droppable key={id} id={id} children={children} dragging={dragging} />)

}
export default Board;

