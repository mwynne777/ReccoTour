import { Artist } from './Artist'

export type User = {
	id: number
	name: string
	selectedArtists: Artist[]
	defaultSelectedArtists: Artist[]
	dislikedArtists: Artist[]
}

export type UserDTO = {
	id: number
	name: string
	selectedArtists: string
	defaultSelectedArtists: string
	dislikedArtists: string
}
