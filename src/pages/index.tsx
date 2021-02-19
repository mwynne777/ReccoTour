import React, { useContext, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { TourContext } from '../store/TourStore';
import { SpotifyLoginButton } from '../components/SpotifyLoginButton';
import { SelectedArtistsPane } from '../components/SelectedArtists/SelectedArtistsPane';
import { RelatedArtistsPane } from '../components/RelatedArtists/RelatedArtistsPane';
import { useFetchUser } from '../utils/user';
import { spotifyTokenName } from '../utils/auth0';
import styled from 'styled-components';

const StyledIndex = styled.div`
  height: calc(100% - 32px); /* seems to be necessary now b/c wrapping div */

  .ant-card {
    background-color: rgb(28, 28, 28);
  }

  .ant-card-head {
    color: white;
    border-bottom: 1px solid hsla(0,0%,100%,.3);
  }

  .ant-list-item {
    padding: 12px 24px;
  }

  .ant-list-split .ant-list-item {
    border-bottom: 1px solid hsla(0,0%,100%,.3);
  }

  .ant-list-item:hover {
    background-color: hsla(0,0%,100%,.3);
  }

  .ant-list-item-meta-title {
    color: white;
    font-size: 15px;
    margin-bottom: 0px;
  }

  .ant-list-item-meta-description {
    color: #b3b3b3;
  }
`;

export default function Index() {
  const { user, loading } = useFetchUser();

  return (
    <MainLayout>
      {(user && user[spotifyTokenName]) ?
        <StyledIndex>
          <SelectedArtistsPane />
          <RelatedArtistsPane />
        </StyledIndex>
        :
        <>

        </>
      }
    </MainLayout>
  );
}
