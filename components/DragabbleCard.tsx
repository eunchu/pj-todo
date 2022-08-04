import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar } from "antd";
import {
  CarryOutOutlined,
  CommentOutlined,
  LinkOutlined,
} from "@ant-design/icons";

import Label from "@components/atoms/Label";
import { ITask } from "@store/interfaces";

interface ICardProps {
  isDragging: boolean;
}
const Card = styled.div<ICardProps>`
  height: 140px;

  display: flex;
  flex-direction: column;

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
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 10px;
  .card-label {
    height: 20px;
    line-height: 20px;

    font-size: 11px;
    color: #ffffff;
    border-radius: 2px;
    padding: 0 10px;
  }
`;
const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  .card-date-text {
    margin-left: 6px;
  }
`;
const Contents = styled.div`
  flex-grow: 1;

  border-bottom: ${({ theme }) => `1px solid ${theme.bgColor}`};

  overflow: auto;
  .card-content-title {
    font-size: 14px;
    font-weight: bold;

    margin-bottom: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
  .card-content-desc {
  }
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 10px;
  .card-footer-left-area {
    display: flex;
    align-items: center;

    .card-footer-label {
      color: #555555;
      margin: 0 10px 0 4px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

interface ICardProps {
  task: ITask;
  index: number;
}
const DragabbleCard = ({ task, index }: ICardProps) => {
  const ASSIGNEES_SIZE = 26;
  const NO_PROFILE_STYLE = {
    backgroundColor: "#a2a2a2",
  };

  return (
    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
      {(provided, snepshot) => (
        <Card
          isDragging={snepshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Header>
            <DateWrapper>
              <CarryOutOutlined />
              <span className="card-date-text">{task.createDate}</span>
            </DateWrapper>
            <Label
              color={task.label?.color}
              title={task.label?.name}
              desc={task.label.desc}
            />
          </Header>
          {/* NOTE 내용 */}
          <Contents>
            <h4 className="card-content-title">{task.title}</h4>
            <div className="card-content-desc">{task.desc}</div>
          </Contents>
          <Footer>
            <div className="card-footer-left-area">
              <CommentOutlined />
              {/* TODO 더미 데이타임. 수정 필요 */}
              {/* NOTE 댓글 & 첨부파일 상태 */}
              <span className="card-footer-label">3</span>
              <LinkOutlined />
              <span className="card-footer-label">1</span>
            </div>
            {/* NOTE 참여자 */}
            <div className="card-avatar card-footer-right-area">
              <Avatar.Group maxCount={3}>
                {task.assignees.map((item) =>
                  item.profileImg ? (
                    <Avatar
                      key={item.id}
                      src={item.profileImg}
                      size={ASSIGNEES_SIZE}
                    />
                  ) : (
                    <Avatar
                      key={item.id}
                      style={NO_PROFILE_STYLE}
                      size={ASSIGNEES_SIZE}
                    >
                      {item.name[0]}
                    </Avatar>
                  )
                )}
              </Avatar.Group>
            </div>
          </Footer>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
