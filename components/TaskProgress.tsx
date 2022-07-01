import React from "react";
import styled from "styled-components";
import { Progress } from "antd";

const Container = styled.section`
  margin-bottom: 40px;
`;
const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;
const Contents = styled.div``;

const TaskProgress = () => {
  return (
    <Container>
      <Title>Progress</Title>
      <Contents>
        <Progress percent={30} trailColor="" />
      </Contents>
    </Container>
  );
};

export default TaskProgress;
