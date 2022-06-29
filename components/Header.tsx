import React from "react";
import styled from "styled-components";
import {
  GithubOutlined,
  AppstoreAddOutlined,
  CalendarOutlined,
  ReadOutlined,
  LayoutFilled,
} from "@ant-design/icons";

const Container = styled.header`
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #ffffff9f;
  border-bottom: 1px solid #ffffff;

  padding: 0 60px;
  .header-icon {
    font-size: 18px;
    color: #434f95;
    cursor: pointer;
  }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;

  .logo-icon {
    font-size: 20px;
    color: #efa067;
    margin-right: 8px;
  }
`;
const Navigator = styled.ul`
  display: flex;
  gap: 30px;
`;
const Right = styled.div`
  display: flex;
  align-items: center;

  gap: 20px;

  .profile-box {
    width: 30px;
    height: 30px;

    border-radius: 50%;
    img {
      width: 100%;
    }
  }
`;

const Header = () => {
  return (
    <Container>
      <Logo>
        <LayoutFilled className="logo-icon" />
        Task Management
      </Logo>
      <nav>
        <Navigator>
          <li>
            <AppstoreAddOutlined className="header-icon" />
          </li>
          <li>
            <CalendarOutlined className="header-icon" />
          </li>
          <li>
            <ReadOutlined className="header-icon" />
          </li>
        </Navigator>
      </nav>
      <Right>
        <GithubOutlined
          className="header-icon"
          onClick={() => window.open("https://github.com/eunchu", "_blank")}
        />
        {/* <div className="profile-box">
          <img src="https://github.com/eunchu.png" alt="" />
        </div> */}
      </Right>
    </Container>
  );
};

export default Header;
