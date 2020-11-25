import React from 'react';
import { Alert } from 'react-native';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { setSelectedMeeting } from '../actions/index';
import ALERT from '../constants/alert';
import { Container, P,Label, ItemContainer } from '../shared/index';
import SCREEN from '../constants/screen';

const RenderItem = ({
  item,
  navigation,
  waitingMeetings,
  setSelectedMeeting,
}) => {
  const openingHours = item.openingHours;
  let isOpen = '-';

  if (typeof openingHours === ALERT.OBJECT) {
    isOpen = openingHours['open_now'] ? ALERT.OPEN : ALERT.CLOSE;
  }

  const handlePressRestaurant = () => {
    if (isOpen === ALERT.CLOSE) return Alert.alert(
      ALERT.IT_IS_CLOSED,
      ALERT.FIND_OTHER_RESTAURANT,
      [
        {
          text: ALERT.YES
        }
      ]
    );

    const hasCreatedMeeting = waitingMeetings.find(
      meeting => meeting.restaurant.restaurantId === item.id
    );
    const partnerNickname = hasCreatedMeeting?.partnerNickname;

    setSelectedMeeting({
      restaurantId: item.id,
      restaurantName: item.name,
      partnerNickname: hasCreatedMeeting ?
        hasCreatedMeeting.partnerNickname :
        '',
    });

    return navigation.navigate(SCREEN.RESTAURANT_DETAILS, { partnerNickname });
  };

  return (
    <ItemContainer onPress={handlePressRestaurant}>
      <Container>
        <Label numberOfLines={2} ellipsizeMode='tail'>{item.name}</Label>
        <P color={isOpen === ALERT.OPEN ? '#28abb9' : '#99a8b2'}>{isOpen}</P>
        <Rating imageSize={14} startingValue={item.rating} readonly />
      </Container>
    </ItemContainer>
  );
};

export default connect(state => ({
  waitingMeetings: state.meetings.waitingMeetings,
}), {
  setSelectedMeeting
})(RenderItem);
