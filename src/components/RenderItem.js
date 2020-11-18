import React from 'react';
import { View, Text } from 'react-native';
import { OBJECT, OPEN, CLOSE } from '../constants/messages';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { setSelectedMeeting } from '../actions/index';
import styled from 'styled-components/native';

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
    const hasCreatedMeeting = filteredMeetings.find(
      meeting => meeting.restaurant.restaurantId === item.restaurantId
    );

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
    <>
    <ItemContainer onPress={handlePressRestaurant}>
    <View>
      <Rating imageSize={20} startingValue={item.rating} readonly />
    </View>
      <View>
        <NameText>{item.name}</NameText>
      </View>
      <View>
        <DetailText isOpen={isOpen === OPEN ? '#28abb9' : '#99a8b2'}>{isOpen}</DetailText>
      </View>
    </ItemContainer>
    </>
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

const ItemContainer = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  border: 2px solid #fbf6f0;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const NameText = styled.Text`
  font-size: 24px;
`;

const DetailText = styled.Text`
  font-size: 36px;
  color: ${props => props.isOpen}
`;
