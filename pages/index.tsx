import type { GetServerSideProps, NextPage } from "next";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";
import styled from "styled-components";
// import Head from "next/head";
// import Image from "next/image";

const Wrapper = styled.div`
  max-width: 480px;
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
  grid-template-columns: repeat(3, fr);
`;
const Board = styled.ul`
  min-height: 300px;

  background-color: ${({ theme }) => theme.boardColor};
  font-size: 16px;

  padding: 16px;
  border-radius: 6px;
`;
const Card = styled.li`
  background-color: ${({ theme }) => theme.cardColor};
  box-shadow: 2px 2px 6px -1px rgba(0, 0, 0, 0.1);
  border-radius: 6px;

  padding: 10px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Home: NextPage = () => {
  const toDos = ["a", "b", "c", "d", "e", "f"];

  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {toDos?.map((todo, idx) => (
                  <Draggable key={idx} draggableId={todo} index={idx}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        {todo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
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
