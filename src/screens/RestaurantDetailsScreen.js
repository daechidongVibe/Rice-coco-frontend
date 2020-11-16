import React from 'react';
import { Text, Button } from 'react-native';

const RestaurantDetails = ({ navigation }) => {
  return (
    <>
      <Text>RestaurantDetails</Text>
      <Button
        title='create'
        onPress={() => navigation.navigate('MatchWaiting')}
      />
    </>
  );
};

export default RestaurantDetails;
