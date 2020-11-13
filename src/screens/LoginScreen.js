import React from 'react';
import { Button, ImageBackground } from 'react-native';
import styled from 'styled-components';

import auth from '../utils/auth';
import axios from '../config/axiosConfig'

const Login = ({ navigation }) => {
  const handleLoginButtonClick = async () => {
    const { googleEmail } = await auth();

    const { data } = await axios.post('users/login', {
      email: 'coin466@naver.com',
    });

    const { result } = data;
    if (result === 'no member information') {
      return navigation.navigate('UserRegister');
    }

    const { user } = data;
    if (!user.preferredPartner) {
      return navigation.navigate('PreferredPartner');
    }

    navigation.navigate('MainMap');
  };

  return (
    <Background>
      <ImageBackground
      source={require('../../assets/images/ricecoco_splash.png')}
      style={{width: '100%', height: '100%', position: 'absolute', bottom: 100}}
      >
        <LoginButton onPress={handleLoginButtonClick}>
          <ButtonText>로그인</ButtonText>
        </LoginButton>
        <Button title="회원가입 (내 정보 등록)" onPress={() => navigation.navigate('UserRegister')} />
      </ImageBackground>
    </Background>
  );
};

const Background = styled.View`
  background-color: #ff914d;
  width: 100%; height: 100%;
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

export default Login;
