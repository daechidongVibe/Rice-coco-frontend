import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { OBJECT, OPEN, CLOSE } from '../constants/messages';
import { Rating } from 'react-native-elements';

const RenderItem = ({ item, searchWord, navigation }) => {
  const openingHours = item.openingHours;
  let isOpen = '-';

  if (typeof openingHours === OBJECT) {
    isOpen = openingHours['open_now'] ? OPEN : CLOSE;
  }

  return (
    <TouchableOpacity
      onPress={
        () => navigation.navigate(
          'RestaurantDetails',
          {
            restaurantId: item.id,
            restaurantName: item.name,
            searchWord
          }
        )
      }
    >
      <View>
        <Text>{item.name}</Text>
        <Rating imageSize={20} readonly startingValue={item.rating} />
        <Text>{isOpen}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItem;
