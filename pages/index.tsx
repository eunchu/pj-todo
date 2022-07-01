import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import {
  DragDropContext,
  resetServerContext,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Avatar } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";

import { ITodos } from "@store/interfaces";
import { toDoState } from "@store/todosAtom";

import Board from "@components/Board";
import TaskProgress from "@components/TaskProgress";
import RecentActivity from "@components/RecentActivity";

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
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
const InfoArea = styled.section`
  width: 300px;
  min-width: 300px;

  background-color: ${({ theme }) => theme.infoBgColor};
  padding: 60px 40px;
`;

const Home: NextPage = () => {
  const [toDos, setToDos] = useRecoilState<ITodos>(toDoState);

  // NOTE Init data
  useEffect(() => {
    const list = new Map();
    [
      {
        id: "1",
        title: "card1",
        droppableId: "one",
        index: 1,
      },
      {
        id: "2",
        title: "card2",
        droppableId: "one",
        index: 2,
      },
      {
        id: "3",
        title: "card3",
        droppableId: "one",
        index: 3,
      },
    ].map((item) => list.set(item.id, item));
    setToDos((todos) => {
      return { ...todos, "To Do": list };
    });
  }, [setToDos]);

  // NOTE 드래그가 끝났을 때
  const onDragEnd = ({ destination, source }: DropResult) => {
    // console.log("drapEnd info", destination, source);

    // 같은 보드안에서의 Card이동
    if (destination?.droppableId === source.droppableId) {
      setToDos((toDos) => {
        const newToDo = new Map(toDos[source.droppableId]);

        const startTarget = newToDo.get(`${source.index}`);
        const endTarget = newToDo.get(`${destination.index}`);
        console.log("?", source.index, destination.index);

        if (startTarget && endTarget) {
          newToDo.delete(startTarget?.id);
          newToDo.set(startTarget?.id, {
            ...endTarget,
            id: startTarget.id,
          });
          newToDo.set(endTarget?.id, {
            ...startTarget,
            id: endTarget.id,
          });
        }

        return { ...toDos, [source.droppableId]: newToDo };
      });
    }
  };

  console.log("toDos", toDos);

  return (
    <Container>
      {/* NOTE Drag 영역 */}
      <DragArea>
        <div className="main-title">
          <Title>Task Management</Title>
          <UserList>
            <Avatar.Group
              maxCount={5}
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            >
              <Avatar src="https://github.com/eunchu.png" />
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
              <Avatar
                style={{ backgroundColor: "#1890ff" }}
                icon={<AntDesignOutlined />}
              />
              <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
            </Avatar.Group>
            <NewUser>
              <Avatar style={{ backgroundColor: "#7685EE" }}>+</Avatar>
            </NewUser>
          </UserList>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <Boards>
              {Object.keys(toDos).map((id) => (
                <Board key={id} toDos={toDos[id]} id={id} />
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
