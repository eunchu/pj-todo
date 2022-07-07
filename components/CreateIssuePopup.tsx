import styled from "styled-components";
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";

import Modal from "@molecules/Modal";
import { ITask } from "@store/interfaces";
import { useSetRecoilState } from "recoil";
import { taskState } from "@store/taskAtom";
import { ButtonPrimary } from "@molecules/Buttons";

const Container = styled.section`
  height: 100%;
`;
const Form = styled.form`
  height: 100%;

  display: flex;
  flex-direction: column;
  .form-area {
    flex-grow: 1;
  }
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
  // NOTE 이슈 추가
  // 서버추가 전, 임시로 로컬스토리지에 저장
  const onSubmit = (task: ITask) => {
    const newIssue = {
      id: Date.now(),
      title: task.title,
    };
    setTasks((allBoards) => {
      localStorage.setItem(
        "tasks",
        JSON.stringify({
          ...allBoards,
          "To Do": [newIssue, ...allBoards["To Do"]],
        })
      );
      return {
        ...allBoards,
        "To Do": [newIssue, ...allBoards["To Do"]],
      };
    });
    onClose();
  };

  return (
    <Modal width={600} height={700} onClose={onClose}>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-area">
            <Controller
              name="title"
              control={control}
              rules={{ required: "제목은 필수 항목입니다" }}
              render={({ field }) => (
                <Input {...field} autoFocus placeholder="title" />
              )}
            />
          </div>
          <FooterArea>
            <ButtonPrimary customStyle={{ width: "80px" }}>Save</ButtonPrimary>
          </FooterArea>
        </Form>
      </Container>
    </Modal>
  );
};

export default CreateIssuePopup;
