import {useState, useCallback, useReducer} from 'react';
import { Tour, TourIndependent, TourDependent } from '../models/Tour';
import { Artist, RelatedArtist } from "../models/Artist";
import { indTour, depTour } from "../store/TourStore";

export const useTour = (): Tour => {
  const [indState, setIndState] = useState(indTour);

  const [depState, dispatch] = useReducer(RelatedArtistsReducer, depTour);

  const setTourFields = useCallback((currentVal: Partial<TourIndependent>): void => {
    setIndState(indState => ({...indState, ...currentVal}));
  }, []);

  const addSelectedArtist = useCallback(async (artists: Artist[]) => {
    await dispatchMiddleware(dispatch, { type: "add-artist", payload: {artists: artists, token: indState.token}});
    setIndState(oldState => ({...oldState, dummy: oldState.dummy + 1}));
  }, [indState.token]);

  const removeSelectedArtist = useCallback((artist: Artist) => {
    dispatch({ type: "remove-selected-artist", payload: {artist: artist}});
  }, []);

  const removeRelatedArtist = useCallback((artist: RelatedArtist) => {
    dispatch({ type: "remove-related-artist", payload: {artist: artist}});
  }, []);

  return {
    ...depState,
    ...indState,
    setTourFields,
    addSelectedArtist,
    removeSelectedArtist,
    removeRelatedArtist
  };
};

const RelatedArtistsReducer = (state: TourDependent, action) : TourDependent=> {
  switch (action.type) {
      case "add-artist":
          return addSelectedArtists(state, action.payload.artists, action.payload.data);
      case "remove-selected-artist":
          return {
              relatedArtists: removeSelectedArtist(state, action.payload.artist),
              selectedArtists: state.selectedArtists.filter((a) => a.id !== action.payload.artist.id)
          };
      case "remove-related-artist":
          return {
              relatedArtists: state.relatedArtists.filter((a) => a.id !== action.payload.artist.id),
              selectedArtists: state.selectedArtists
          };
      default:
          return state;
  }
};

const dispatchMiddleware = async (dispatch, action) => {
  let relatedArtists = await Promise.all(
    action.payload.artists.map(async a => {
      let resp = await fetch(`https://api.spotify.com/v1/artists/${a.id}/related-artists`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'Bearer ' + action.payload.token
        })
      });
      return resp.json()
    })
  )
  dispatch({...action, payload: {...action.payload, data: relatedArtists}});
};

const getNewRelatedArtists = (state: TourDependent, artist: Artist, data) : RelatedArtist[] => {
  
  let newRelatedArtists: RelatedArtist[] = data.artists;
  let newUniqueRelatedArtists: RelatedArtist[] = [];
  newRelatedArtists.forEach(element => {
    let artistAlreadySelected: boolean = state.selectedArtists.find(a => a.id === element.id) !== undefined;
    if(!artistAlreadySelected) {
      if(state.relatedArtists.find(a => a.id === element.id) === undefined) {
        newUniqueRelatedArtists.push({...element, selectedArtistIDs: [artist.id]});
      }
      else {
        let relatedArtist: RelatedArtist = state.relatedArtists.find(a => a.id === element.id);
        relatedArtist.selectedArtistIDs = relatedArtist.selectedArtistIDs.concat([artist.id]);
      }
    }
  });
  let relatedArtists = state.relatedArtists.concat(newUniqueRelatedArtists);
  //Don't want newly selected artist included in related artists as well
  return relatedArtists.filter(ra => ra.id !== artist.id);
};

const addSelectedArtists = (state: TourDependent, artists: Artist[], data: Artist[][]) : TourDependent => {
  for(var i = 0; i < artists.length; i++) {
    //TODO: Add disliked artists to this call
    const newSelectedArtists = addSelectedArtistIfValid(state.selectedArtists, [], artists[i]);
    const shouldAddRelatedArtists = newSelectedArtists.length > state.selectedArtists.length;

    state.selectedArtists = newSelectedArtists;

    let newRelatedArtsts = [];
    if(shouldAddRelatedArtists){
      newRelatedArtsts = getNewRelatedArtists(state, artists[i], data[i]);
    } else {
      newRelatedArtsts = state.relatedArtists;
    }

    state.relatedArtists = newRelatedArtsts;

  }
  return state;
};

const addSelectedArtistIfValid = (selectedArtists: Artist[], dislikedArtists: Artist[], newArtist: Artist) => {
  let artistAlreadySelected: boolean = selectedArtists.find(a => a.id === newArtist.id) !== undefined;
  let artistDisliked: boolean = dislikedArtists.find(a => a.id == newArtist.id) !== undefined;
  if(!artistAlreadySelected && !artistDisliked){
    return [...selectedArtists, newArtist];
  }
  return selectedArtists;
};

const removeSelectedArtist = (state: TourDependent, artist: Artist) : RelatedArtist[]=> {
  let relatedArtists: RelatedArtist[] = [...state.relatedArtists];
  //delete relatedArtists r, if the selected artist is the only reason we're including r
  relatedArtists = relatedArtists.filter((a) => a.selectedArtistIDs.length > 1 || 
      (a.selectedArtistIDs.length === 1 && a.selectedArtistIDs[0] !== artist.id));
  //remove selected artist from related artists that are included by multiple selected artists
  state.relatedArtists.forEach( element => {
    element.selectedArtistIDs = element.selectedArtistIDs.filter(id => id !== artist.id);
  });
  return relatedArtists;
}