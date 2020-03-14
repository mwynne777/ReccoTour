

export interface Tour {
    token?: any, 
    autofillNames?: any[], 
    autofillArtists?: any[],
    autofillOptions?: any[],
    selectedArtists?: any[],
    relatedArtists?: any[],
    setTourFields?: (newVals: Tour) => void
  }