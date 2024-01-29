import { FC } from "react"
import Draggable from './Draggable'
import { DraggableProps } from "../utilities/types";

const Card: FC<DraggableProps> = ({ id, children }) => {
  return (
    <div className="mb-10">
      <Draggable id={id} children={children} />
    </div>
  );
};

export default Card;
