import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useFetchUser } from '../../utils/user';

const { Header } = Layout;

const Navbar = () => {
  const { user, loading } = useFetchUser();

  return (
    <Header style={{backgroundColor: "white", paddingBottom:"0px"}}>
      <h3 style={{float: "left", lineHeight: "48px", marginRight: "10px"}}>ReccoTour</h3>
      <Menu mode="horizontal" style={{width: "100%"}}>
        <Menu.Item key="/">
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        {user && !loading
          ? [
            <Menu.Item key="/profile">
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </Menu.Item>,
              <Menu.Item key="/api/logout">
                <Link href="/api/logout">
                  <a>Logout</a>
                </Link>
              </Menu.Item>
            ]
          : null}
        {!user && !loading ? (
          <Menu.Item key="/api/login">
            <Link href="/api/login">
              <a>Login</a>
            </Link>
          </Menu.Item>
        ) : null}
      </Menu>
    </Header>
  );
};

export default Navbar;
