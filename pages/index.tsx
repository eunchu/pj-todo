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

const DragArea = styled.div`
  font-size: 16px;
`;

const Home: NextPage = () => {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DragArea>
        <Droppable droppableId="one">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId="1" index={0}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    One
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="2" index={1}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps}>
                    <span {...provided.dragHandleProps}>🎃</span>
                    Two
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </DragArea>
    </DragDropContext>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // 서버사이드에서 호출!
  return { props: { data: [] } };
};

export default Home;
