import { Layout } from 'antd';
import React, { ReactNode} from 'react';
import Navbar from './Navbar';
import { useFetchUser, UserProvider } from '../../utils/user';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useFetchUser();

  return (
    <UserProvider value={{ user, loading }}>
      <Layout>
        <Navbar />
          {children}
      </Layout>
    </UserProvider>
  );
};
