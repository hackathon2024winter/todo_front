import { FC, ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';

interface PropsType {
  id: number;
  children: ReactNode
}

const Draggable: FC<PropsType> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
  } = useDraggable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef}
      {...listeners}
      {...attributes}>
      {props.children}
    </div>
  );
}

export default Draggable;