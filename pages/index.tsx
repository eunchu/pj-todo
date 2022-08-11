import { useRef } from "react";
import type { GetServerSideProps, NextPage } from "next";
import {
  DragDropContext,
  resetServerContext,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";

import Board from "@components/Board";
import TaskProgress from "@components/TaskProgress";
import RecentActivity from "@components/RecentActivity";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys, taskAPIs } from "@api";
import { ISSUE_TYPE } from "@consts";
import Header from "@components/Header";

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
  const getListRef = useRef<boolean>(true);

  // NOTE 전체 Task 목록 호출
  const { data: initTasks } = useQuery(
    queryKeys.taskKeyById("[GET]-All"),
    () => taskAPIs.getTasks(),
    {
      retry: 0,
      enabled: getListRef.current === true,
      onSuccess: () => (getListRef.current = false),
    }
  );

  // NOTE Task 업데이트
  const updateTask = useMutation((task: any) => taskAPIs.updateTask(task), {
    onSuccess: () => {
      console.log("update!");
      getListRef.current = true;
    },
  });

  // NOTE 드래그가 끝났을 때
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination || !source) return;

    // 같은 보드안에서의 Card이동
    if (destination?.droppableId === source.droppableId) {
      const changedSource = {
        ...initTasks?.data[source.index],
        order: destination.index,
      };
      const changedDestination = {
        ...initTasks?.data[destination.index],
        order: source.index,
      };
      const updateItems = [changedSource, changedDestination];

      updateTask.mutate(updateItems as any);
    } else {
      // 다른 보드로의 Card이동
      const changedSource = {
        ...initTasks?.data[source.index],
        issueType: destination.droppableId,
      };
      const updateItems = [changedSource];

      updateTask.mutate(updateItems as any);
    }
  };

  return (
    <>
      <Header />
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
                {ISSUE_TYPE.map((type) => (
                  <Board
                    key={type}
                    tasks={
                      initTasks?.data.filter(
                        (task) => task.issueType === type
                      ) ?? []
                    }
                    type={type}
                  />
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // 서버사이드에서 호출!
  return { props: { data: [] } };
};

export default Home;
