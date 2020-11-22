import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import asyncStorage from '@react-native-async-storage/async-storage';

import  { YES, NO, YOU_WANT_TO_LOGOUT } from '../constants/messages';

const MyPageScreen = ({ navigation, user, userId }) => {
  const isUserLoggedIn = userId ? true : false;

  const logout = () => {
    return Alert.alert(
      YOU_WANT_TO_LOGOUT,
      null,
      [
        {
          text: YES,
          onPress: async () => {
            await asyncStorage.removeItem('token');
            return navigation.navigate('Login');
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
          if (!isUserLoggedIn) return;
          navigation.navigate('EditUserInfo');
        }}
      >
        <ButtonText>내 정보 수정하기</ButtonText>
      </Button>
      <Button
        onPress={() => {
          if (!isUserLoggedIn) return;
          navigation.navigate('PreferredPartner');
        }}
      >
        <ButtonText>선호하는 친구</ButtonText>
      </Button>
      <Button
        onPress={() => {
          if (!isUserLoggedIn) return;
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
}))(MyPageScreen);
