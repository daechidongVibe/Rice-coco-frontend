import React, { useEffect } from 'react';
import { Button, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import asyncStorage from '@react-native-async-storage/async-storage';

import auth from '../utils/auth';
import configuredAxios from '../config/axiosConfig';
import { setUserInfo } from '../actions';

const Login = ({ navigation, setUserInfo }) => {
  useEffect(() => {
    (async () => {
      asyncStorage.clear(); // 테스트용, 매번 로그인을 해야 앱에 접속할 수 있도록
      const token = await asyncStorage.getItem('token');

      if (!token) return;

      const {
        data: { user },
      } = await configuredAxios.post('users/login');

      setUserInfo(user);

      if (!user.preferredPartner) {
        return navigation.navigate('PreferredPartner');
      }

      navigation.navigate('MainMap');
    })();
  }, []);

  const handleLoginButtonClick = async (e) => {
    console.log('로그인버튼 눌림!!');
    e.target.disabled = true;

    try {
      const { email } = await auth();
      console.log('구글에서 authentication 성공 이후 받아온 구글 이메일 => ', email);
      const { data } = await configuredAxios.post(
        'users/login',
        { email }
      );

      if (data.result === 'no member information') {
        return navigation.navigate('UserRegister', { email });
      }

      const { user, token } = data;

      await asyncStorage.setItem('token', token);

      setUserInfo(user);

      if (!user.preferredPartner) {
        return navigation.navigate('PreferredPartner');
      }

      navigation.navigate('MainMap');
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Background>
      <ImageBackground
        source={require('../../assets/images/ricecoco_splash.png')}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          bottom: 100,
        }}
      >
        <LoginButton onPress={handleLoginButtonClick}>
          <ButtonText>로그인</ButtonText>
        </LoginButton>
        <Button
          title="회원가입 (내 정보 등록)"
          onPress={() => navigation.navigate('UserRegister')}
        />
      </ImageBackground>
    </Background>
  );
};

const Background = styled.View`
  background-color: #ff914d;
  width: 100%;
  height: 100%;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-25px);
`;

const ButtonText = styled.Text`
  color: black;
`;

export default connect(
  null,
  { setUserInfo }
  )(Login);
