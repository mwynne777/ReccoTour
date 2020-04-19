export interface Artist {
    external_urls: any,
    followers: any,
    genres: string[],
    href: string,
    id: string,
    images: any[],
    name: string,
    popularity: number,
    type: string,
    uri: string
}

export interface RelatedArtist extends Artist {
    selectedArtistIDs: string[]
}

export type ArtistDTO = Pick<Artist, 'id' | 'name' | 'genres' | 'images'>;