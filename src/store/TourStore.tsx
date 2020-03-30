import { createContext } from 'react';
import { Tour, TourIndependent, TourDependent } from "../models/Tour";

export const depTour: TourDependent = {
    selectedArtists: [],
    relatedArtists: []
};

export const indTour: TourIndependent = {
    token: null
  };

export const TourContext = createContext<Tour>(null);