import React, { useState } from 'react';
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

  return (
    <View style={styles.locationPicker}>
      <MapPreview location={location} style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>{text}</Text>
        )}
      </MapPreview>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
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
});
