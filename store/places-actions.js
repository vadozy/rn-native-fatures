import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const addPlace = (title, imageUri) => {
  return async (dispatch) => {
    // Example: grab "6a0c408c-cecf-4e4d-8ee8-9186c5287786.jpg"
    // from file:///data/user/0/.../6a0c408c-cecf-4e4d-8ee8-9186c5287786.jpg
    const fileName = imageUri.split('/').pop();

    const newPath = FileSystem.documentDirectory + fileName;

    let dbGeneratedId = null;

    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
      const result = await insertPlace(
        title,
        newPath,
        'dummy address',
        42.42,
        3.1415
      );
      dbGeneratedId = result.insertId.toString();
      console.log('db insert result: ', result);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }

    dispatch({
      type: ADD_PLACE,
      placeData: {
        id: dbGeneratedId,
        title,
        imageUri: newPath,
      },
    });
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const result = await fetchPlaces();
      // console.log(result);
      dispatch({ type: SET_PLACES, places: result.rows._array });
    } catch (err) {
      console.error('Error in loadPlaces()');
      throw err;
    }
  };
};
