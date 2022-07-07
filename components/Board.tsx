import React, { useState } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons";

import { ITask } from "@store/interfaces";

import CreateIssuePopup from "@components/CreateIssuePopup";
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
  font-size: 14px;

  cursor: pointer;
  .add-board {
    margin-right: 6px;
  }
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
  tasks: ITask[];
}
const Board = ({ id, tasks }: IBoardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Wrapper>
      <div className="board-title-area">
        <Title>{id}</Title>
        <MoreMenu>
          <PlusCircleOutlined
            className="add-board"
            onClick={() => setIsOpen(true)}
          />
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
            {tasks.map((task, idx) => (
              <DragabbleCard key={task.id} index={idx} task={task} />
            ))}
            {provided.placeholder}
          </BoardBox>
        )}
      </Droppable>
      {isOpen && <CreateIssuePopup onClose={() => setIsOpen(false)} />}
    </Wrapper>
  );
};

export default Board;
