import { Layout } from 'antd';
import React, { ReactNode} from 'react';
import { useFetchUser, UserProvider } from '../../utils/user';
import Navbar from './Navbar';

export const ProfileLayout = ({ children }: { children: ReactNode }) => {

  return (
    <Layout style={{backgroundColor: "white"}}>
        <Navbar />
        {children}
    </Layout>
  );
};
