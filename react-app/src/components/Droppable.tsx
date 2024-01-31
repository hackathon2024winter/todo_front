import { useDroppable } from "@dnd-kit/core";
import { FC, useEffect } from "react";
import classNames from "classnames";
import { DroppableItem } from "../utilities/types";

const Droppable: FC<DroppableItem> = (props) => {
  const { setNodeRef, isOver } = useDroppable({ id: props.id });

  // isOver状態が変化した際にコールバック関数を呼び出す
  useEffect(() => {
    props.onIsOverChange?.(isOver);
  }, [isOver, props, props.onIsOverChange]);

  return (
    <div
      ref={setNodeRef}
      className={classNames(props.className, { 'bg-green-300': isOver, 'bg-orange-200': !isOver }
      )}
    >
      {props.children}
    </div>
  )
}

export default Droppable;
