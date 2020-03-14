import React, { useEffect } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import "./App.css";
import 'antd/dist/antd.css';
import { TourContext } from "./store/TourStore";
import { useTour } from "./hooks/useTour";
import { AutoComplete } from "./components/Autocomplete";
import { SelectedArtistsList } from "./components/SelectedArtistsList";
import { RelatedArtists } from "./components/RelatedArtists";

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
        {!tour.token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {tour.token && (
          <div>
            <AutoComplete />
            <SelectedArtistsList />
            <RelatedArtists />
          </div>
          )}
      </div>
    </TourContext.Provider>
  );
}

export default App;