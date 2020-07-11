import React, { useContext, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { TourContext } from '../store/TourStore';
import { SpotifyLoginButton } from '../components/SpotifyLoginButton';
import { SelectedArtistsPane } from '../components/SelectedArtists/SelectedArtistsPane';
import { RelatedArtistsPane } from '../components/RelatedArtists/RelatedArtistsPane';
import { useFetchUser } from '../utils/user';
import { spotifyTokenName } from '../utils/auth0';

export default function Index() {
  const { user, loading } = useFetchUser();

  return (
    <MainLayout>
      <div className="App">
        {(user && user[spotifyTokenName]) ?
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
