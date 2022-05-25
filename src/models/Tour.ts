import { Artist, RelatedArtist } from "./Artist";

export interface TourDependent {
  selectedArtists: Artist[];
  relatedArtists: RelatedArtist[];
}

export interface TourIndependent {
  token: string;
  dummy: number;
}

export interface Tour {
  token: string;
  dummy: number;
  selectedArtists: Artist[];
  relatedArtists: RelatedArtist[];
  init: (newVals: Partial<TourIndependent>) => void;
  addSelectedArtist: (artists: Artist[]) => void;
  removeSelectedArtist: (artist: Artist) => void;
  removeRelatedArtist: (artist: RelatedArtist) => void;
}
