import { Layout, Spin } from 'antd';
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { useFetchUser, UserProvider } from '../../utils/user';
import { useRouter } from 'next/router'
import { SpotifyLoginButton } from '../SpotifyLoginButton';

const { Content } = Layout;

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useFetchUser();

  return (
    <UserProvider value={{ user, loading }}>
      <Layout style={{ backgroundColor: 'black' }}>
        <Navbar />
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          {loading &&
            <Spin size="large" />
          }
          {user && !loading ?
            children
            :
            <>
              <SpotifyLoginButton />
            </>
          }
        </Content>
      </Layout>
    </UserProvider>
  );
};
