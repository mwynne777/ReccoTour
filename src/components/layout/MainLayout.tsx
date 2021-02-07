import { Layout, Spin } from 'antd';
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { useFetchUser, UserProvider } from '../../utils/user';
import { useRouter } from 'next/router'
import { SpotifyLoginButton } from '../SpotifyLoginButton';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useFetchUser();
  const router = useRouter();

  // if(!user && !loading) {
  //   router.push("/api/login");
  // }

  return (
    <UserProvider value={{ user, loading }}>
      <Layout style={{ backgroundColor: "white" }}>
        <Navbar />
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
      </Layout>
    </UserProvider>
  );
};
