import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { ITask } from "@store/interfaces";

interface ICardProps {
  isDragging: boolean;
}
const Card = styled.div<ICardProps>`
  height: 100px;

  background-color: ${({ theme }) => theme.cardColor};
  box-shadow: 2px 2px 6px -1px rgba(130, 130, 130, 0.1);
  border-radius: 6px;

  padding: 10px;
  margin-bottom: 10px;

  opacity: ${(props) => props.isDragging && 0.7};
  &:last-child {
    margin-bottom: 0;
  }
`;

interface ICardProps {
  task: ITask;
  index: number;
}
const DragabbleCard = ({ task, index }: ICardProps) => {
  return (
    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
      {(provided, snepshot) => (
        <Card
          isDragging={snepshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {task.title}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
