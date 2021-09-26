import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Colors from '../constants/Colors';

import MapPreview from './MapPreview';
import * as Location from 'expo-location';

const LocationPicker = (props) => {
  const [location, setLocation] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = props.navigation.getParam('pickedLocation');

  useEffect(() => {
    setLocation(mapPickedLocation);
    props.onLocationPicked(mapPickedLocation);
  }, [mapPickedLocation?.lat, mapPickedLocation?.lng, props.onLocationPicked]);

  const verifyPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Insufficient permissions',
          'Permission to access location was denied',
          [{ text: 'Okay' }]
        );
        return false;
      }
      return true;
    }
  };

  let text = 'Waiting..';
  if (location) {
    text = JSON.stringify(location);
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const loc = await Location.getCurrentPositionAsync();
      setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      props.onLocationPicked({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        'Could not get location',
        'Try again later or pick a location on the map',
        [{ text: 'Okay' }]
      );
    } finally {
      setIsFetching(false);
    }
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        onPress={pickOnMapHandler}
        location={location}
        style={styles.mapPreview}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>{text}</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
