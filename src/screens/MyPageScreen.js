import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import asyncStorage from '@react-native-async-storage/async-storage';
import { resetUserInfo, resetMeeting } from '../actions/index';
import resetAction from '../utils/navigation';
import ALERT from '../constants/alert';
import SCREEN from '../constants/screen';
import { Wrapper, Title, OutlineButton, P } from '../shared/index';

const MyPageScreen = ({
  navigation,
  userId,
  resetUserInfo,
  resetMeeting
}) => {
  const logout = () => {
    if (!userId) return;

    return Alert.alert(
      ALERT.LOGOUT_MESSAGE,
      null,
      [{
        text: ALERT.YES,
        onPress: async () => {
          await asyncStorage.removeItem('token');
          resetUserInfo();
          resetMeeting();
          navigation.dispatch(resetAction(0, SCREEN.HOME ));
        }},
        {
        text: ALERT.NO,
      }]
    );
  };

  return (
    <Wrapper>
      <Title>내 정보</Title>
      <OutlineButton
        onPress={() => {
          if (!userId) return;
          navigation.navigate(SCREEN.EDIT_USER_INFO);
        }}
      >
        <P>내 정보 수정하기</P>
      </OutlineButton>
      <OutlineButton
        onPress={() => {
          if (!userId) return;
          navigation.navigate(SCREEN.PREFERRED_PARTNER);
        }}
      >
        <P>선호하는 친구</P>
      </OutlineButton>
      <OutlineButton
        onPress={() => {
          if (!userId) return;
          navigation.navigate(SCREEN.PAYMENT);
        }}
      >
        <P>결제</P>
      </OutlineButton>
      <OutlineButton
        onPress={logout}
      >
        <P>로그아웃</P>
      </OutlineButton>
    </Wrapper>
  );
};

export default connect(state => ({
  user: state.user,
  userId: state.user._id,
}), {
  resetUserInfo,
  resetMeeting,
})(MyPageScreen);
