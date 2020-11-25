import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { resetMeeting } from '../actions';
import configuredAxios from '../config/axiosConfig';
import resetAction from '../utils/navigation';
import ROUTE from '../constants/route';
import SCREEN from '../constants/screen';
import { COLOR } from '../constants/assets';
import { Wrapper, P, StyledView, StyledText, StyledButton } from '../shared/index';

const AfterMeetingScreen = ({
  userId,
  meetingId,
  resetMeeting,
  partnerNickname,
  navigation,
}) => {
  const handleAgreeButtonClick = async () => {
    await configuredAxios.put(`users/${userId}${ROUTE.FAVORITE_PARTNERS}`, {
      partnerNickname,
    });

    navigation.dispatch(resetAction(0, SCREEN.MAIN_MAP));
    resetMeeting();
  };

  const handleRejectButtonClick = () => {
    navigation.dispatch(resetAction(0, SCREEN.MAIN_MAP));
    resetMeeting();
  };

  return (
    <Wrapper color={COLOR.THEME_COLOR}>
      <StyledView>
        <StyledText>{partnerNickname}님과의 식사는 어떠하셨나요?</StyledText>
        <StyledText>밥친구로 추가하시겠어요?</StyledText>
      </StyledView>
      <StyledButton
        color={COLOR.WHITH}
        onPress={handleAgreeButtonClick}
      >
        <P>나의 라이스코코</P>
      </StyledButton>
      <StyledButton
        color={COLOR.WHITH}
        onPress={handleRejectButtonClick}
      >
        <P>아니요 하지 않겠습니다</P>
      </StyledButton>
    </Wrapper>
  );
};

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
