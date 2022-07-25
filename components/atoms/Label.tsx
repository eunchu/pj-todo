import React from "react";
import styled from "styled-components";

interface ILabelBox {
  textColor: string;
  bgColor: string;
}
const LabelBox = styled.div<ILabelBox>`
  font-size: 11px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bgColor};
  border-radius: 4px;

  padding: 4px 8px;
`;

interface ILabel {
  color: {
    text: string;
    bg: string;
  };
  desc?: string;
  title: string;
}
const Label = ({ color, desc, title }: ILabel) => {
  return (
    <LabelBox
      title={desc ? desc : title}
      textColor={color.text}
      bgColor={color.bg}
    >
      {title}
    </LabelBox>
  );
};

export default Label;
