import { Layout } from 'antd';
import React, { ReactNode, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import { TourContext } from '../../store/TourStore';
import { useFetchUser, UserProvider } from '../../Util/user';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const tour = useContext(TourContext);
  const { user, loading } = useFetchUser();

  useEffect(() => {
    // Set token
    if (user && user['https://my.ns/spotify/access_token']) {
      tour.setTourFields( {token: user['https://my.ns/spotify/access_token']} );
    }
  }, [user]);

  return (
    <UserProvider value={{ user, loading }}>
      <Layout>
        <Navbar />
          {children}
      </Layout>
    </UserProvider>
  );
};
