

export interface Tour {
    token?: any, 
    selectedArtists?: any[],
    relatedArtists?: any[],
    setTourFields?: (newVals: Tour) => void
  }