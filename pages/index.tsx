import type { GetServerSideProps, NextPage } from "next";
import {
  DragDropContext,
  resetServerContext,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Avatar } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";

import { ITasks } from "@store/interfaces";
import { taskState } from "@store/taskAtom";

import Board from "@components/Board";
import TaskProgress from "@components/TaskProgress";
import RecentActivity from "@components/RecentActivity";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys, taskAPIs } from "api";

const Container = styled.div`
  height: calc(100vh - 50px);

  display: flex;
  justify-content: space-between;
`;
const DragArea = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;

  padding: 60px;

  .main-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 40px;
  }
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;
const UserList = styled.div`
  display: flex;
  align-items: center;
`;
const NewUser = styled.div`
  margin-left: 12px;
  cursor: pointer;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 0;

  display: flex;
  flex-grow: 1;

  margin: 0 auto;
`;
const Boards = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
const InfoArea = styled.section`
  width: 300px;
  min-width: 300px;

  background-color: ${({ theme }) => theme.infoBgColor};
  padding: 60px 40px;
`;

const Home: NextPage = () => {
  const [tasks, setTasks] = useRecoilState<ITasks>(taskState);

  // NOTE 드래그가 끝났을 때
  const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
    if (!destination || !source) return;

    // 같은 보드안에서의 Card이동
    if (destination?.droppableId === source.droppableId) {
      setTasks((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const target = boardCopy[source.index];

        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, target);

        const newBoards = { ...allBoards, [source.droppableId]: boardCopy };
        localStorage.setItem("tasks", JSON.stringify(newBoards));
        return newBoards;
      });
    } else {
      // 다른 보드로의 Card이동
      setTasks((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const target = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, target);

        const newBoards = {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
        localStorage.setItem("tasks", JSON.stringify(newBoards));
        return newBoards;
      });
    }
  };

  // NOTE 임시로 로컬스토리지 사용 >>>
  // useEffect(() => {
  //   const data = typeof window !== "undefined" && localStorage.getItem("tasks");
  //   if (data) setTasks(JSON.parse(data));
  // }, [setTasks]);

  const { data: initTasks } = useQuery(
    queryKeys.taskKeyById("[GET]-All"),
    () => taskAPIs.getTasks(),
    {
      retry: 0,
    }
  );

  return (
    <Container>
      {/* NOTE Drag 영역 */}
      <DragArea>
        <div className="main-title">
          <Title>Task Management</Title>
          <UserList>
            <Avatar.Group
              maxCount={5}
              maxStyle={{ color: "#a2a2a2", backgroundColor: "#fde3cf" }}
            >
              <Avatar src="https://github.com/eunchu.png" />
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Avatar style={{ backgroundColor: "#a2a2a2" }}>K</Avatar>
              <Avatar
                style={{ backgroundColor: "#a2a2a2" }}
                icon={<UserOutlined />}
              />
              <Avatar
                style={{ backgroundColor: "#a2a2a2" }}
                icon={<AntDesignOutlined />}
              />
              <Avatar style={{ backgroundColor: "#a2a2a2" }}>K</Avatar>
            </Avatar.Group>
            <NewUser>
              <Avatar style={{ backgroundColor: "#367C72" }}>+</Avatar>
            </NewUser>
          </UserList>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <Boards>
              {Object.keys(tasks).map((id) => (
                <Board key={id} tasks={tasks[id]} id={id} />
              ))}
            </Boards>
          </Wrapper>
        </DragDropContext>
      </DragArea>
      {/* NOTE Info 영역 */}
      <InfoArea>
        {/* 캘린더 추가 */}
        <TaskProgress />
        <RecentActivity />
      </InfoArea>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // 서버사이드에서 호출!
  return { props: { data: [] } };
};

export default Home;
