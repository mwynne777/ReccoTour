import { Layout, Spin } from 'antd';
import React, { ReactNode} from 'react';
import Navbar from './Navbar';
import { useFetchUser, UserProvider } from '../../utils/user';
import { useRouter } from 'next/router'

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useFetchUser();
  const router = useRouter();

  if(!user && !loading) {
    router.push("/api/login");
  }

  return (
    <UserProvider value={{ user, loading }}>
      <Layout style={{backgroundColor: "white"}}>
        <Navbar />
          { user && !loading ?
            children
            :
            <Spin size="large" />
          }
      </Layout>
    </UserProvider>
  );
};
