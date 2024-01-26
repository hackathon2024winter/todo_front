import { FC, useState } from "react";
import { DndContext, UniqueIdentifier } from "@dnd-kit/core";
import DraggableItem from "../components_story/DraggableItem";
import { Droppable } from "../components_story/Droppable";
import { DraggableOverlay } from "../components_story/Draggable";
import { GridContainer } from "../components_story/GridContainer";

const About: FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">About</h2>
      <DndContext
        onDragStart={() => setIsDragging(true)}
        onDragEnd={({ over }) => {
          setParent(over ? over.id : null);
          setIsDragging(false);
        }}
        onDragCancel={() => setIsDragging(false)}
      >
        {parent === null ? <DraggableItem /> : null}
        <GridContainer columns={2}>
          <Droppable key='A' id='A' dragging={isDragging}>
            {parent === 'A' ? <DraggableItem /> : null}
          </Droppable>
        </GridContainer>
        <DraggableOverlay />
      </DndContext>
    </>
  );
}
export default About;
