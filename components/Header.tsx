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
import { useRouter } from "next/router";
import Link from "next/link";

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

  cursor: pointer;
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
const LoginMenus = styled.div`
  display: flex;
  .login {
    margin-right: 16px;
  }
`;

const Header = () => {
  const [activeMenu, setActiveMenu] = useRecoilState(commonState);

  const router = useRouter();
  console.log("router", router.pathname);

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

  // 로그인 페이지일 경우 상단에
  // 로고랑 로그인 / 회원가입 메뉴로 변경

  return (
    <Container>
      <Link href={"/"}>
        <Logo>
          <LayoutFilled className="logo-icon" />
          Task Management
        </Logo>
      </Link>
      {["/login", "/join"].includes(router.pathname) ? (
        <LoginMenus>
          <Link href={"/login"}>
            <div className="login">로그인</div>
          </Link>
          <Link href={"/join"}>
            <div>회원가입</div>
          </Link>
        </LoginMenus>
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
};

export default Header;
