import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { OBJECT, OPEN, CLOSE } from '../constants/messages';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { setSelectedMeeting } from '../actions/index';

const RenderItem = ({ item, navigation, filteredMeetings, setSeletedMeeting }) => {
  const openingHours = item.openingHours;
  let isOpen = '-';

  if (typeof openingHours === OBJECT) {
    isOpen = openingHours['open_now'] ? OPEN : CLOSE;
  }
  const onHandlePress = () => {
    const hasWattingPartnerMeeting = filteredMeetings.find(meeting => meeting.restaurant.restaurantId === item.restaurantId);

    if (hasWattingPartnerMeeting) {
      setSeletedMeeting({
        restaurantId: item.id,
        restaurantName: item.name,
        partnerNickname: hasWattingPartnerMeeting.partnerNickname
      });
    }

    return navigation.navigate('RestaurantDetails');
  };

  return (
    <TouchableOpacity onPress={onHandlePress}>
      <View>
        <Text>{item.name}</Text>
        <Rating imageSize={20} readonly startingValue={item.rating} />
        <Text>{isOpen}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default connect(state => ({
  filteredMeetings: state.filteredMeeting,
}), {
  setSelectedMeeting,
}
)(RenderItem);
