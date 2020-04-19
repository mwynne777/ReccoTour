import React, { useContext, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { TourContext } from '../store/TourStore';
import { SpotifyLoginButton } from '../components/SpotifyLoginButton';
import { SelectedArtistsPane } from '../components/SelectedArtists/SelectedArtistsPane';
import { RelatedArtistsPane } from '../components/RelatedArtists/RelatedArtistsPane';
import { useFetchUser } from '../utils/user';

export default function Index() {
  const tour = useContext(TourContext);
  const { user, loading } = useFetchUser();

  useEffect(() => {
    // Set token
    if (user && user['https://my.ns/spotify/access_token']) {
      tour.setTourFields( {token: user['https://my.ns/spotify/access_token']} );
    }
  }, [user]);

  return (
    <MainLayout>
        <div className="App">
          {(!tour.token && !loading) ?
            <SpotifyLoginButton />
          : 
            <>
              <SelectedArtistsPane />
              <RelatedArtistsPane />
            </>
          }
      </div>
    </MainLayout>
  );
}
