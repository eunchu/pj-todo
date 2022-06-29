import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import {
  DragDropContext,
  resetServerContext,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { ITodos } from "@store/interfaces";
import { toDoState } from "@store/todosAtom";
import Board from "@components/Board";

const Wrapper = styled.div`
  max-width: 680px;
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto;
`;
const Boards = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
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
      // {
      //   id: "2",
      //   title: "card2",
      //   droppableId: "one",
      //   index: 2,
      // },
      // {
      //   id: "3",
      //   title: "card3",
      //   droppableId: "one",
      //   index: 3,
      // },
    ].map((item) => list.set(item.id, item));
    setToDos((todos) => {
      return { ...todos, "To Do": list };
    });
  }, [setToDos]);

  // NOTE 드래그가 끝났을 때
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    console.log("drapEnd info", draggableId, destination, source);

    // setToDos((todos) => {
    //   const todoList = new Map(todos.toDo);
    //   const target = todoList.get(draggableId);
    //   target &&
    //     todoList.set(target.id, {
    //       ...target,
    //       index: destination?.index as number,
    //     });
    //   const target2 = todoList.get(`${destination?.index}`);
    //   target2 &&
    //     todoList.set(target2.id, {
    //       ...target2,
    //       index: source?.index as number,
    //     });
    //   return { ...todos, "To Do": todoList };
    // });
  };

  // console.log("???", toDos);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((id) => (
            <Board key={id} toDos={toDos[id]} id={id} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // 서버사이드에서 호출!
  return { props: { data: [] } };
};

export default Home;
