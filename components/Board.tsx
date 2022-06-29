import React from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  resetServerContext,
  DropResult,
} from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import { ITodo } from "@store/interfaces";

const Wrapper = styled.section``;
const Title = styled.section`
  font-size: 14px;
  font-weight: 600;

  margin-bottom: 10px;
`;
const BoardBox = styled.ul`
  min-height: 300px;

  background-color: ${({ theme }) => theme.boardColor};
  font-size: 16px;

  padding: 16px;
  border-radius: 6px;
`;

interface IBoardProps {
  id: string;
  toDos: Map<string, ITodo>;
}
const Board = ({ id, toDos }: IBoardProps) => {
  return (
    <Wrapper>
      <Title>{id}</Title>
      <Droppable droppableId={id}>
        {(provided) => (
          <BoardBox ref={provided.innerRef} {...provided.droppableProps}>
            {[...toDos.values()]?.map((toDo) => (
              <DragabbleCard key={toDo.id} toDo={toDo} />
            ))}
            {provided.placeholder}
          </BoardBox>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
