import { FC } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { DraggableItem } from '../utilities/types';


const Draggable: FC<DraggableItem> = (props) => {
  const { attributes, listeners, setNodeRef, } = useDraggable({ id: props.id });

  return (
    <div ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
}

export default Draggable;