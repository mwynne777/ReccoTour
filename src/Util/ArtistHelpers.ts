
export const getAvatarFromArtist = (a: any) => {
    if(a.images.length > 0) {
      return a.images[0].url;
    }
    return require("../images/emptyAvatar.png");
}