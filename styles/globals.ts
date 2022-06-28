import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// import "antd/dist/antd.css";

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  * {
    box-sizing: border-box;
  }
  html, body, #root {
    width: 100%;
    height: 100%;

    font-family: 'Raleway', sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 1;

    background-color: ${({ theme }) => theme.bgColor};
    color: #303030;

    margin: 0;
    padding: 0;
  } 
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
