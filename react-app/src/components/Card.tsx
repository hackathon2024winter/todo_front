import { FC } from "react"
import { Draggable } from './Draggable'
import { DraggableProps } from "../utilities/types";

const Card: FC<DraggableProps> = ({ id, children }) => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <Draggable id={id} children={children} />
    </div>
  );
};

export default Card;