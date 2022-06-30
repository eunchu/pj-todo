import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import "antd/dist/antd.css";

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  * {
    box-sizing: border-box;
  }
  html, body, #root {
    width: 100%;
    min-width: 1200px;
    height: 100%;

    font-family: 'Raleway', sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 1;

    background: linear-gradient(45deg, rgba(225,231,244,.7) 39%, rgba(246,231,240,.7) 75%, rgba(250,215,201,.6) 100%);
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
