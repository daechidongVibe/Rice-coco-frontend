import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { OBJECT, OPEN, CLOSE } from '../constants/messages';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { setSelectedMeeting } from '../actions/index';

const RenderItem = ({
  item,
  searchWord,
  navigation,
  filteredMeetings,
  setSelectedMeeting,
}) => {
  const openingHours = item.openingHours;
  let isOpen = '-';

  if (typeof openingHours === OBJECT) {
    isOpen = openingHours['open_now'] ? OPEN : CLOSE;
  }

  const handlePressRestaurant = () => {
    console.log('전체 미팅..', filteredMeetings);
    console.log('에서 이 아이디의 레스토랑이 있는지 확인..', item.restaurantId);

    const hasCreatedMeeting = filteredMeetings.find(
      meeting => meeting.restaurant.restaurantId === item.restaurantId
    );

    console.log('이미 만들어진 미팅 존재하나요???', hasCreatedMeeting);

    setSelectedMeeting({
      restaurantId: item.id,
      restaurantName: item.name,
      partnerNickname: hasCreatedMeeting ?
        hasCreatedMeeting.partnerNickname :
        '',
    });

    return navigation.navigate('RestaurantDetails', { searchWord });
  };

  return (
    <TouchableOpacity onPress={handlePressRestaurant}>
      <View>
        <Text>{item.name}</Text>
        <Rating imageSize={20} startingValue={item.rating} readonly />
        <Text>{isOpen}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default connect(
  state => ({
    filteredMeetings: state.meetings.filteredMeetings,
  }),
  {
    setSelectedMeeting,
  }
)(RenderItem);
