import { Artist } from "./Artist";

export interface User {
    id: number,
    name: string,
    selectedArtists: Artist[],
    defaultSelectedArtists: Artist[],
    dislikedArtists: Artist[]
};

export interface UserDTO {
    id: number,
    name: string,
    selectedArtists: string,
    defaultSelectedArtists: string,
    dislikedArtists: string
}