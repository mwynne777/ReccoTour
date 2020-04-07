import React, { useEffect } from "react";
import hash from "./hash";
import "./App.css";
import 'antd/dist/antd.css';
import { TourContext } from "./store/TourStore";
import { useTour } from "./hooks/useTour";
import { RelatedArtistsPane } from "./components/RelatedArtists/RelatedArtistsPane";
import { SpotifyLoginButton } from "./components/SpotifyLoginButton";
import { SelectedArtistsPane } from "./components/SelectedArtists/SelectedArtistsPane";

const App = () => {

  const tour = useTour();
  let _token = (hash as any).access_token;

  useEffect(() => {
    // Set token
    if (_token) {
      tour.setTourFields( {token: _token} );
    }
  }, [_token]);

  return (
    <TourContext.Provider value={tour}>
      <div className="App">
        {!tour.token && 
          <SpotifyLoginButton />
        }
        {tour.token && 
          <>
            <SelectedArtistsPane />
            <RelatedArtistsPane />
          </>
        }
      </div>
    </TourContext.Provider>
  );
}

export default App;