import { ADD_PLACE, SET_PLACES } from './places-actions';
import Place from '../models/place';

const initialState = {
  places: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PLACE: {
      const newPlaces = [...state.places];
      const place = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.imageUri,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      newPlaces.push(place);
      return {
        ...state,
        places: newPlaces,
      };
    }
    case SET_PLACES: {
      const places = action.places;
      const newPlaces = places.map(
        (p) =>
          new Place(
            p.id.toString(),
            p.title,
            p.imageUri,
            p.address,
            p.lat,
            p.lng
          )
      );
      return {
        ...state,
        places: newPlaces,
      };
    }
    default:
      return state;
  }
}
