import React, { useMemo } from "react";
import styled from "styled-components";
import {
  GithubOutlined,
  AppstoreAddOutlined,
  CalendarOutlined,
  ReadOutlined,
  LayoutFilled,
} from "@ant-design/icons";
import { useRecoilState } from "recoil";

import { commonState } from "@store/commonsAtom";
import { EMenu } from "@store/interfaces";

const Container = styled.header`
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.headerColor};

  padding: 0 60px;
  .header-icon {
    font-size: 18px;
    color: #7e848d8d;
  }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;

  .logo-icon {
    font-size: 20px;
    color: ${({ theme }) => theme.mainColor};
    margin-right: 8px;
  }
`;
const Navigator = styled.ul`
  display: flex;
`;
interface INavProps {
  active: boolean;
}
const Nav = styled.li<INavProps>`
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: ${(props) =>
    props.active && `1px solid ${props.theme.mainColor}`};
  cursor: ${(props) => props.active && "pointer"};

  .header-icon {
    color: ${(props) => props.active && props.theme.mainColor};
  }
`;
const Right = styled.div`
  .header-icon {
    color: #a2b3ce;
  }
`;

const Header = () => {
  const [activeMenu, setActiveMenu] = useRecoilState(commonState);

  const navList = useMemo(() => {
    return [
      {
        id: EMenu.BOARD,
        render: <AppstoreAddOutlined className="header-icon" />,
      },
      {
        id: EMenu.CALENDER,
        render: <CalendarOutlined disabled className="header-icon" />,
      },
      {
        id: EMenu.WIKI,
        render: <ReadOutlined className="header-icon" />,
      },
    ];
  }, []);

  return (
    <Container>
      <Logo>
        <LayoutFilled className="logo-icon" />
        Task Management
      </Logo>
      <nav>
        <Navigator>
          {navList.map((nav) => (
            <Nav active={nav.id === activeMenu ? true : false} key={nav.id}>
              {nav.render}
            </Nav>
          ))}
        </Navigator>
      </nav>
      <Right>
        <GithubOutlined
          className="header-icon"
          onClick={() => window.open("https://github.com/eunchu", "_blank")}
        />
      </Right>
    </Container>
  );
};

export default Header;
