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
interface IBoardBoxProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
const BoardBox = styled.div<IBoardBoxProps>`
  height: calc(100% - 24px);

  background-color: ${(props) =>
    props.isDraggingOver ? "#cccccc" : props.theme.boardColor};

  padding: 16px;
  border-radius: 6px;

  transition: background-color 0.3s;
`;

interface IBoardProps {
  id: string;
  toDos: string[];
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
        {(provided, snepshot) => (
          <BoardBox
            isDraggingOver={snepshot.isDraggingOver}
            // 원래 spot에서 떠날때
            isDraggingFromThis={Boolean(snepshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, idx) => (
              <DragabbleCard key={toDo} index={idx} toDo={toDo} />
            ))}
            {provided.placeholder}
          </BoardBox>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
