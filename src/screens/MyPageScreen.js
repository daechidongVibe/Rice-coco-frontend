import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import asyncStorage from '@react-native-async-storage/async-storage';
import { resetUserInfo, resetMeeting } from '../actions/index';
import resetAction from '../utils/navigation';
import ALERT from '../constants/alert';
import SCREEN from '../constants/screen';

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
    <Container>
      <Header>내 정보</Header>
      <Button
        onPress={() => {
          if (!userId) return;
          navigation.navigate(SCREEN.EDIT_USER_INFO);
        }}
      >
        <ButtonText>내 정보 수정하기</ButtonText>
      </Button>
      <Button
        onPress={() => {
          if (!userId) return;
          navigation.navigate(SCREEN.PREFERRED_PARTNER);
        }}
      >
        <ButtonText>선호하는 친구</ButtonText>
      </Button>
      <Button
        onPress={() => {
          if (!userId) return;
          navigation.navigate(SCREEN.PAYMENT);
        }}
      >
        <ButtonText>결제</ButtonText>
      </Button>
      <Button
        onPress={logout}
      >
        <ButtonText>로그아웃</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  height: 100%;
  padding: 20px;
`;

const Header = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 20px auto;
`;

const Button = styled.TouchableOpacity`
  background-color: #ff914d;
  width: 100%;
  margin: 10px auto;
  padding: 15px;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-size: 20px;
`;

export default connect(state => ({
  user: state.user,
  userId: state.user._id,
}), {
  resetUserInfo,
  resetMeeting,
})(MyPageScreen);
