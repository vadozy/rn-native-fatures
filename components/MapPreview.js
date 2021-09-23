import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { GOOGLE_MAPS_API_KEY } from '../env-private';

const MapPreview = (props) => {
  const [lat, lng] = [props.location?.lat, props.location?.lng];

  let imagePreviewUrl;
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap%20&markers=color:red%7Clabel:A%7C${lat},${lng}%20&key=${GOOGLE_MAPS_API_KEY}`;
  }

  return (
    <View style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});
