import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as placesActions from '../store/places-actions';
import Colors from '../constants/Colors';

import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState();

  const titleChangeHandler = useCallback((text) => {
    setTitleValue(text);
  }, []);

  const dispatch = useDispatch();

  const savePlaceHandler = async () => {
    console.log(`Saving place: ${titleValue}`);
    await dispatch(placesActions.addPlace(titleValue, selectedImageUri));
    props.navigation.goBack();
  };

  const imageTakenHandler = (uri) => setSelectedImageUri(uri);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={titleValue}
          style={styles.textInput}
          onChangeText={titleChangeHandler}
        />
        <ImagePicker onImageTake={imageTakenHandler} />
        <LocationPicker />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place',
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
