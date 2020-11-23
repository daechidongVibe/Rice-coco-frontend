import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import asyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { LOGOUT_MESSAGE, YES, NO } from '../constants/messages';
import { resetUserInfo, resetMeeting } from '../actions/index';

const MyPageScreen = ({
  navigation,
  userId,
  resetUserInfo,
  resetMeeting
}) => {
  const logout = () => {
    if (!userId) return;

    return Alert.alert(
      LOGOUT_MESSAGE,
      null,
      [{
        text: YES,
        onPress: async () => {
          await asyncStorage.removeItem('token');
          resetUserInfo();
          resetMeeting();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                },
              ],
            })
          );
        }
      },
      {
        text: NO,
      }
      ]
    );
  };

  return (
    <Container>
      <Header>내 정보</Header>
      <Button
        onPress={() => {
          if (!userId) return;
          navigation.navigate('EditUserInfo');
        }}
      >
        <ButtonText>내 정보 수정하기</ButtonText>
      </Button>
      <Button
        onPress={() => {
          if (!userId) return;
          navigation.navigate('PreferredPartner');
        }}
      >
        <ButtonText>선호하는 친구</ButtonText>
      </Button>
      <Button
        onPress={() => {
          if (!userId) return;
          navigation.navigate('Payment');
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
