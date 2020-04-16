import { Artist, RelatedArtist } from "./Artist";

export interface TourDependent {
  selectedArtists?: Artist[],
  relatedArtists?: RelatedArtist[]
}

export interface TourIndependent {
  token?: string
}

export interface Tour {
  token?: string,
  selectedArtists?: Artist[],
  relatedArtists?: RelatedArtist[],
  setTourFields?: (newVals: TourIndependent) => void,
  addSelectedArtist?: (artist: Artist) => void,
  removeSelectedArtist?: (artist: Artist) => void,
  removeRelatedArtist?: (artist: RelatedArtist) => void
}