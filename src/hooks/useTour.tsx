import {useState, useCallback} from 'react';
import { Tour } from '../models/Tour';
import { tour } from "../store/TourStore";


export const useTour = (): Tour => {
  const [stateObj, setStateObj] = useState(tour);

  const setTourFields = useCallback((currentVal: Tour): void => {
    setStateObj(stateObj => ({...stateObj, ...currentVal}));
  }, []);

  return {
    ...stateObj,
    setTourFields
  };
};