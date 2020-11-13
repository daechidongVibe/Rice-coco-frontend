import React from 'react';
import { Button, ImageBackground } from 'react-native';
import styled from 'styled-components';

import auth from '../utils/auth';
import axios from 'axios';

const Login = ({ navigation }) => {
  const handleLoginButtonClick = async () => {
    const result = await auth();

    console.log('login result =>', result);

    navigation.navigate('MainMap');

    // const user = await axios('localhost:3000/users/login');

    if (!user) {
      // 내 정보 등록 페이지로 navigate
    }

    // 유저가 있어서 로그인은 성공적으로 되었는데,
    if (Object.keys(user.preferredPartner) <= 3) {
      // 메인 지도로 navigate
      // navigation.navigate('MainMap');
    }
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
