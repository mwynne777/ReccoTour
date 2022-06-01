import { Layout, Spin } from 'antd';
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { useFetchUser, UserProvider } from '../../utils/user';
import { useRouter } from 'next/router'
import { SpotifyLoginButton } from '../SpotifyLoginButton';
import styled from 'styled-components';

const { Content } = Layout;

const StyledContent = styled(Content)`
  padding: 0px 50px;
  margin-top: 64px;
  text-align: center;
  height: calc(100vh - 64px);
  background-color: rgb(15, 15, 15);
`;

const StyledSpinnerContainer = styled.div`
    margin-top: 32px;
    width: 100%;
    display: flex;
    justify-content: space-around;
`;

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useFetchUser();

  return (
    <UserProvider value={{ user, loading }}>
      <Layout style={{ backgroundColor: 'black' }}>
        <Navbar />
        <StyledContent>
          {loading &&
            <StyledSpinnerContainer>
              <Spin size="large" />
            </StyledSpinnerContainer>
          }
          {user && !loading ?
            children
            :
            <>
              <SpotifyLoginButton />
            </>
          }
        </StyledContent>
      </Layout>
    </UserProvider>
  );
};
