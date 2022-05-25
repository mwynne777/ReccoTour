export type Artist = {
	external_urls: any
	followers: any
	genres: string[]
	href: string
	id: string
	images: any[]
	name: string
	popularity: number
	type: string
	uri: string
}

export type RelatedArtist = Artist & {
	selectedArtistIDs: string[]
}
