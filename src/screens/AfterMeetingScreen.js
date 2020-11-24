import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { StackActions, CommonActions } from '@react-navigation/native';

import { resetMeeting } from '../actions';
import configuredAxios from '../config/axiosConfig';

const AfterMeetingScreen = ({
  userId,
  resetMeeting,
  partnerNickname,
  navigation,
}) => {
  const handleAgreeButtonClick = async () => {
    await configuredAxios.put(`users/${userId}/favorite-partners`, {
      partnerNickname,
    });

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'MainMap',
          },
        ],
      })
    );
    resetMeeting();
  };

  const handleRejectButtonClick = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'MainMap',
          },
        ],
      })
    );

    resetMeeting();
  };

  return (
    <Container>
      <BackgroundImage source={require('../../assets/images/rice.png')} />
      <TextWrapper>
        <StyledText>{partnerNickname}님과의 식사는 어떠하셨나요?</StyledText>
        <StyledText>밥친구로 추가하시겠어요?</StyledText>
      </TextWrapper>
      <ButtonWrapper>
        <HighlightButton
          activeOpacity={0.6}
          onPress={handleAgreeButtonClick}
          underlayColor="#DDDDDD"
        >
          <Text>밥친구로 추가하기</Text>
        </HighlightButton>
        <HighlightButton
          activeOpacity={0.6}
          onPress={handleRejectButtonClick}
          underlayColor="#DDDDDD"
        >
          <Text>아니요 하지 않겠습니다</Text>
        </HighlightButton>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
  background-color: #ff914d;
`;

const TextWrapper = styled.View`
  margin-top: 70px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.View`
  display: flex;
  width: 70%;
`;

const StyledText = styled.Text`
  font-size: 20px;
  color: white;
  text-align: center;
  font-weight: bold;
`;

const HighlightButton = styled.TouchableHighlight`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  top: 200px;
  opacity: 0.2;
`;

export default connect(
  state => ({
    userId: state.user._id,
    meetingId: state.meetings.selectedMeeting.meetingId,
    partnerNickname: state.meetings.selectedMeeting.partnerNickname,
  }),
  {
    resetMeeting,
  }
)(AfterMeetingScreen);
