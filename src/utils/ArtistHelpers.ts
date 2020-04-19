import {  UserDTO, User } from "../models/User";

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