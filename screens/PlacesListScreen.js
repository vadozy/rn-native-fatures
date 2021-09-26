import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Platform, FlatList } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useSelector, useDispatch } from 'react-redux';

import * as placesActions from '../store/places-actions';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

const renderItem =
  (navigate) =>
  ({ item }) => {
    return (
      <PlaceItem
        title={item.title}
        image={item.imageUri}
        address={item.address}
        onSelect={() =>
          navigate('PlaceDetail', { placeTitle: item.title, placeId: item.id })
        }
      />
    );
  };

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(p) => p.id}
      renderItem={renderItem(props.navigation.navigate)}
    />
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
