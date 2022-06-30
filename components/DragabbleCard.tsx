import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { ITodo } from "@store/interfaces";

const Card = styled.li`
  height: 100px;

  background-color: ${({ theme }) => theme.cardColor};
  box-shadow: 2px 2px 6px -1px rgba(130, 130, 130, 0.1);
  border-radius: 6px;

  padding: 10px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

interface ICardProps {
  toDo: ITodo;
}
const DragabbleCard = ({ toDo }: ICardProps) => {
  return (
    <Draggable key={toDo.id} draggableId={toDo.id} index={toDo.index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDo.title}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
