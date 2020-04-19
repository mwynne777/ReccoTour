import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useFetchUser } from '../../utils/user';

const { Header } = Layout;

const Navbar = () => {
  const { user, loading } = useFetchUser();

  return (
    <Header>
      <Menu mode="horizontal">
        <Menu.Item key="/">
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        {user && !loading
          ? [
              <Menu.Item key="/api/logout">
                <Link href="/api/logout">
                  <a>Logout</a>
                </Link>
              </Menu.Item>,
              <Menu.Item key="/profile">
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </Menu.Item>,
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
