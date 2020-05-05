import {  UserDTO, User } from "../models/User";
import { Artist } from "../models/Artist";

export const getAvatarFromArtist = (a: any) => {
    if(a.images.length > 0) {
      return a.images[0].url;
    }
    return require("../images/emptyAvatar.png");
}

export const deserializeArtists = (user: UserDTO) : User => {
  return {
    id: user.id,
    name: user.name,
    selectedArtists: JSON.parse(user.selectedArtists),
    defaultSelectedArtists: JSON.parse(user.defaultSelectedArtists),
    dislikedArtists: JSON.parse(user.dislikedArtists)
  };
}

export const sortArtists = (artists: Artist[]) : Artist[]=> {
  const result: Artist[] = artists.sort(function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return result;
};