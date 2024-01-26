import { FC, useState } from "react";

import {
  DndContext,
  CollisionDetection as CollisionDetectionType,
  Modifiers,
  UniqueIdentifier,
} from '@dnd-kit/core';

import { Wrapper } from '../components_story/Wrapper'
import { GridContainer } from "../components_story/GridContainer";
import { Droppable } from "../components_story/Droppable";
import { DraggableOverlay } from "../components_story/Draggable";
import DraggableItem from "../components_story/DraggableItem";

interface Props {
  collisionDetection?: CollisionDetectionType;
  containers?: string[];
  modifiers?: Modifiers;
  value?: string;
}

const Home: FC<Props> = ({
  containers = ['A'],
  collisionDetection,
  modifiers,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const item = <DraggableItem />;

  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Home</h2>
      <DndContext
        collisionDetection={collisionDetection}
        modifiers={parent === null ? undefined : modifiers}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={({ over }) => {
          setParent(over ? over.id : null);
          setIsDragging(false);
        }}
        onDragCancel={() => setIsDragging(false)}
      >
        <Wrapper>
          <Wrapper style={{ width: 350, flexShrink: 0 }}>
            {parent === null ? item : null}
          </Wrapper>
        </Wrapper>
        <GridContainer columns={2}>
          {containers.map((id) => (
            <Droppable key={id} id={id} dragging={isDragging}>
              {parent === id ? item : null}
            </Droppable>
          ))}
        </GridContainer>
        <DraggableOverlay />
      </DndContext>
    </>
  );
}

export default Home;