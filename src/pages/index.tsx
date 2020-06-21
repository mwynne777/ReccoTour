import React, { useContext, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { TourContext } from '../store/TourStore';
import { SpotifyLoginButton } from '../components/SpotifyLoginButton';
import { SelectedArtistsPane } from '../components/SelectedArtists/SelectedArtistsPane';
import { RelatedArtistsPane } from '../components/RelatedArtists/RelatedArtistsPane';
import { useFetchUser } from '../utils/user';

export default function Index() {
  const { user, loading, token } = useFetchUser();

  return (
    <MainLayout>
        <div className="App">
          {(user && token) ?
            <>
              <SelectedArtistsPane />
              <RelatedArtistsPane />
            </>
          : 
            <SpotifyLoginButton />
          }
      </div>
    </MainLayout>
  );
}
