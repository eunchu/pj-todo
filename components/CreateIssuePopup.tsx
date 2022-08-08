import styled from "styled-components";
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { ContainerOutlined } from "@ant-design/icons";
import { Select, Popover } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";

import { ITask, EBoard } from "@store/interfaces";
import { useSetRecoilState } from "recoil";
import { taskState } from "@store/taskAtom";
import { ButtonPrimary } from "@molecules/Buttons";
import { ISSUE_TYPE } from "@consts";

import Modal from "@molecules/Modal";
import { useMemo } from "react";

const { Option } = Select;

const Container = styled.section`
  height: 100%;
`;
const Form = styled.form`
  height: 100%;

  display: flex;
  flex-direction: column;
`;
const FromArea = styled.div`
  flex-grow: 1;

  padding: 0 24px 24px 24px;
  .textArea {
    display: flex;
    .title-icon {
      margin-right: 4px;
    }
  }
`;
const SectionWarraper = styled.div`
  margin-bottom: 26px;
`;
const Title = styled.h3`
  font-weight: bold;
  color: ${({ theme }) => theme.text.color.subTitle};

  margin-bottom: 6px;
`;
const RequiredMark = styled.span`
  font-size: 14px;
  line-height: 0;
  color: #c82020;

  margin-left: 6px;
`;
const FooterArea = styled.div`
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  border-top: 1px solid #ededf3;
  padding: 0 24px;
`;

interface ICreateIssuePopupProps {
  onClose: () => void;
}
const CreateIssuePopup = ({ onClose }: ICreateIssuePopupProps) => {
  const { handleSubmit, control } = useForm<ITask>();

  const setTasks = useSetRecoilState(taskState);

  // 1. 로컬 스토리지 저장
  // 2. 이슈 삭제
  // 3. board 순서 변경
  // 4. board 생성

  //test
  const addTask = useMutation(
    () =>
      fetch("/api/task", {
        method: "POST",
        body: JSON.stringify({
          id: Date.now(),
          title: "post test",
          desc: "이슈에 관한 설명을 이곳에 작성합니다",
          createDate: moment().format("MMM DD"),
          label: {
            name: "Feature",
            desc: "기능 추가",
            color: {
              text: "#ffffff",
              bg: "#61798F",
            },
          },
          assignees: [
            {
              id: 1,
              name: "eunju",
              profileImg: "https://github.com/eunchu.png",
            },
            {
              id: 2,
              name: "eunju2",
              profileImg: null,
            },
            {
              id: 3,
              name: "eunju3sdfsdf",
              profileImg: null,
            },
            {
              id: 4,
              name: "eunju3sdfsdf",
              profileImg: null,
            },
          ],
          issueType: EBoard.ToDo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: () => {
        console.log("success");
      },
    }
  );

  // const onClickSave = () => {
  //   addTask.mutate();
  // };

  // NOTE 이슈 추가
  // 서버추가 전, 임시로 로컬스토리지에 저장
  const onSubmit = (task: ITask) => {
    const newIssue = {
      id: Date.now(),
      title: task.title,
      desc: "이슈에 관한 설명을 이곳에 작성합니다",
      createDate: moment().format("MMM DD"),
      label: {
        name: "Feature",
        desc: "기능 추가",
        color: {
          text: "#ffffff",
          bg: "#61798F",
        },
      },
      assignees: [
        {
          id: 1,
          name: "eunju",
          profileImg: "https://github.com/eunchu.png",
        },
        {
          id: 2,
          name: "eunju2",
          profileImg: null,
        },
        {
          id: 3,
          name: "eunju3sdfsdf",
          profileImg: null,
        },
        {
          id: 4,
          name: "eunju3sdfsdf",
          profileImg: null,
        },
      ],
      issueType: EBoard.ToDo,
    };
    addTask.mutate();
    // setTasks((allBoards) => {
    //   localStorage.setItem(
    //     "tasks",
    //     JSON.stringify({
    //       ...allBoards,
    //       "To Do": [newIssue, ...allBoards["To Do"]],
    //     })
    //   );
    //   return {
    //     ...allBoards,
    //     "To Do": [newIssue, ...allBoards["To Do"]],
    //   };
    // });

    onClose();
  };

  // NOTE Assignee Box UI
  const assigneeBoxEl = useMemo(() => {
    // 유저 목록 호출. 호출 후 UI구현되도록 해야함
    return <div>box</div>;
  }, []);

  return (
    <Modal width={600} height={700} onClose={onClose}>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FromArea>
            {/* NOTE 이슈유형 선택 */}
            <SectionWarraper>
              <div className="textArea">
                <ContainerOutlined className="title-icon" />
                <Title>Select Issue Type</Title>
              </div>
              <Controller
                name="issueType"
                control={control}
                rules={{ required: "이슈 타입을 선택해주세요" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    defaultValue={EBoard.ToDo}
                    style={{ width: "120px" }}
                  >
                    {ISSUE_TYPE.map((type) => (
                      <Option key={type} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </SectionWarraper>

            {/* NOTE Title */}
            <SectionWarraper>
              <div className="textArea">
                <ContainerOutlined className="title-icon" />
                <Title>
                  Task Title
                  <RequiredMark>*</RequiredMark>
                </Title>
              </div>
              <Controller
                name="title"
                control={control}
                rules={{ required: "제목은 필수 항목입니다" }}
                render={({ field }) => (
                  <Input {...field} autoFocus placeholder="title" />
                )}
              />
            </SectionWarraper>

            {/* NOTE Description */}
            <SectionWarraper>
              <div className="textArea">
                <ContainerOutlined className="title-icon" />
                <Title>Description</Title>
              </div>
              <Controller
                name="desc"
                control={control}
                rules={{ required: "제목은 필수 항목입니다" }}
                render={({ field }) => (
                  <Input {...field} autoFocus placeholder="Desctiption" />
                )}
              />
            </SectionWarraper>

            {/* NOTE Assignees */}
            <SectionWarraper>
              <div className="textArea">
                <ContainerOutlined className="title-icon" />
                <Title>Assignees</Title>
              </div>
              <Controller
                name="assignees"
                control={control}
                rules={{ required: "최소 한명이 할당되야 합니다" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    mode="multiple"
                    style={{ minWidth: "120px" }}
                  >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                  </Select>
                )}
              />
            </SectionWarraper>
          </FromArea>
          <FooterArea>
            <ButtonPrimary
              customStyle={{ width: "80px" }}
              // onClick={onClickSave}
            >
              Save
            </ButtonPrimary>
          </FooterArea>
        </Form>
      </Container>
    </Modal>
  );
};

export default CreateIssuePopup;
