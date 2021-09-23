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
        action.placeData.id,
        action.placeData.title,
        action.placeData.imageUri
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
        (p) => new Place(p.id.toString(), p.title, p.imageUri)
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
