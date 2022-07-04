import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";

import { ButtonPrimary, ButtonSecondary } from "@molecules/Buttons";

const Background = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.247);
`;
interface IContainerProps {
  width?: number;
  height?: number;
}
const Container = styled.section<IContainerProps>`
  width: ${(props) => (props.width ? `${props.width}px` : "700px")};
  height: ${(props) => (props.height ? `${props.height}px` : "700px")};

  display: flex;
  flex-direction: column;

  background-color: #ffffff;
`;
const HeaderArea = styled.div`
  height: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #ededf3;
  padding: 0 24px;

  .ic-modal-close {
    cursor: pointer;
  }
`;
const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
`;
const Content = styled.div`
  flex-grow: 1;
  padding: 24px;
`;
const FooterArea = styled.div`
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  border-top: 1px solid #ededf3;
  padding: 0 24px;
`;

const Portal = ({ children }: any) => {
  const el = document.body.appendChild(document.createElement("div"));
  return ReactDOM.createPortal(children, el);
};

interface IModalProps {
  width?: number;
  height?: number;
  title?: string;
  buttons?: { name: string; type: string; width?: string }[];
  onClose: () => void;
  children: React.ReactElement;
}
const Modal: React.FC<IModalProps> = ({
  width,
  height,
  title = "",
  buttons,
  onClose,
  children,
}) => {
  return (
    <Portal>
      <Background>
        <Container width={width} height={height}>
          <HeaderArea>
            <Title>{title}</Title>
            <CloseOutlined onClick={onClose} className="ic-modal-close" />
          </HeaderArea>
          <Content>{children}</Content>
          <FooterArea>
            {buttons?.map((button, idx) =>
              button.type === "primary" ? (
                <ButtonPrimary
                  onClick={() => button.name === "Close" && onClose()}
                  width={button.width ?? "100%"}
                  customStyle={{ marginRight: "8px" }}
                  key={idx}
                >
                  {button.name}
                </ButtonPrimary>
              ) : (
                <ButtonSecondary
                  onClick={() => button.name === "Close" && onClose()}
                  width={button.width ?? "100%"}
                  key={idx}
                >
                  {button.name}
                </ButtonSecondary>
              )
            )}
          </FooterArea>
        </Container>
      </Background>
    </Portal>
  );
};

export default Modal;
