import { createContext } from 'react';
import { Tour } from "../models/Tour";

export const tour: Tour = {
    token: null, 
    autofillNames: [], 
    autofillArtists: [],
    autofillOptions: [],
    selectedArtists: [],
    relatedArtists: [],
    setTourFields: () => {}
};

export const TourContext = createContext<Tour>(tour);