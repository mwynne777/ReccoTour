import React, { useContext } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { TourContext } from '../store/TourStore';
import { SpotifyLoginButton } from '../components/SpotifyLoginButton';
import { SelectedArtistsPane } from '../components/SelectedArtists/SelectedArtistsPane';
import { RelatedArtistsPane } from '../components/RelatedArtists/RelatedArtistsPane';

export default function Index() {
  const tour = useContext(TourContext);


  return (
    <MainLayout>
        <div className="App">
          {!tour.token ?
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
