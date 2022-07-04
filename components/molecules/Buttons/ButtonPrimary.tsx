import Image from "next/image";
import styled from "styled-components";

import { makeImgPath } from "@utils";

interface IContainer {
  isDisable: boolean;
  width: string;
}
const Container = styled.button<IContainer>`
  min-width: ${(props) => props.width};
  height: 40px;

  font-size: 14px;
  font-weight: 400;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
    !props.isDisable ? props.theme.mainColor : props.theme.disabledBgColor};

  transition-duration: 0.2s;

  user-select: none;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const IconArea = styled.div`
  margin-right: 6px;
`;

interface IButtonPrimary {
  readonly customStyle?: object | any;
  readonly children: string;
  readonly icon?: string;
  readonly isDisable?: boolean;
  onClick?: () => void;
}
const ButtonPrimary = ({
  customStyle,
  children,
  icon,
  isDisable = false,
  onClick,
  ...props
}: IButtonPrimary) => {
  return (
    <Container
      isDisable={isDisable}
      width={customStyle?.width ?? "100%"}
      style={{ ...customStyle }}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <IconArea>
          <Image src={makeImgPath(icon)} alt="" />
        </IconArea>
      )}
      {children}
    </Container>
  );
};

export { ButtonPrimary };
