import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useFetchUser } from '../../utils/user';
import styled, { css } from 'styled-components';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: black;
`;

const StyledMenu = styled(Menu)`
  line-height: 64px;
  background-color: black;
  border-bottom: none;
  height: 64px;
`;

const StyledMenuItem = styled(Menu.Item)`
  border-bottom: none !important;
`;

const Navbar = () => {
  const { user, loading } = useFetchUser();

  return (
    <StyledHeader >
      <h3 style={{ float: "left", lineHeight: "56px", marginRight: "10px" }}>ReccoTour</h3>
      <StyledMenu mode="horizontal">
        <StyledMenuItem key="/">
          <Link href="/">
            <a>Home</a>
          </Link>
        </StyledMenuItem>
        {user && !loading
          ? [
            <StyledMenuItem key="/profile" >
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </StyledMenuItem>,
            <StyledMenuItem key="/api/logout" >
              <Link href="/api/logout">
                <a>Logout</a>
              </Link>
            </StyledMenuItem>
          ]
          : null}
        {!user && !loading ? (
          <StyledMenuItem key="/api/login">
            <Link href="/api/login">
              <a>Login</a>
            </Link>
          </StyledMenuItem>
        ) : null}
      </StyledMenu>
    </StyledHeader>
  );
};

export default Navbar;
