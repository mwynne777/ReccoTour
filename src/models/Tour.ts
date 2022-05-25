import { Artist, RelatedArtist } from './Artist'

export type TourDependent = {
	selectedArtists: Artist[]
	relatedArtists: RelatedArtist[]
}

export type TourIndependent = {
	token: string
}

export type Tour = TourDependent &
	TourIndependent & {
		init: (newVals: Partial<TourIndependent>) => void
		addSelectedArtist: (artists: Artist[]) => void
		removeSelectedArtist: (artist: Artist) => void
		removeRelatedArtist: (artist: RelatedArtist) => void
	}
