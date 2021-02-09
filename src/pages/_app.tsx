import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import "../App.css";
import "../components/RelatedArtists/RelatedArtistsPane.css";
import "../components/SelectedArtists/SelectedArtistsPane.css";
import { useTour } from "../hooks/useTour";
import { TourContext } from "../store/TourStore";
import { useFetchUser } from "../utils/user";
import { spotifyTokenName } from '../utils/auth0';

export default function MyApp({ Component, pageProps }) {
  const tour = useTour();
  const { user } = useFetchUser();

  useEffect(() => {
    tour.setTourFields({ token: user ? user[spotifyTokenName] : null });
  }, [user]);

  return <TourContext.Provider value={tour}><Component {...pageProps} /></TourContext.Provider>
}