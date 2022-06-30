import React from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  resetServerContext,
  DropResult,
} from "react-beautiful-dnd";
import { MoreOutlined } from "@ant-design/icons";

import { ITodo } from "@store/interfaces";

import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.section`
  .board-title-area {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 10px;
  }
`;
const Title = styled.h3`
  font-size: 14px;
  font-weight: 600;
`;
const MoreMenu = styled.div`
  cursor: pointer;
`;
const BoardBox = styled.ul`
  height: calc(100% - 24px);

  background-color: ${({ theme }) => theme.boardColor};

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
      <div className="board-title-area">
        <Title>{id}</Title>
        <MoreMenu>
          <MoreOutlined />
        </MoreMenu>
      </div>
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
