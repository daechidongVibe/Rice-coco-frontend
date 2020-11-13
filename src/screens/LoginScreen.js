import React from 'react';
import { Button, ImageBackground } from 'react-native';
import styled from 'styled-components';

import auth from '../utils/auth';
import axios from '../config/axiosConfig'

const Login = ({ navigation }) => {
  const handleLoginButtonClick = async () => {
    const { email } = await auth();

    const { data } = await axios.post('users/login', {
      email,
    });

    const { result } = data; // 아예 유저 정보가 없는 경우
    if (result === 'no member information') {
      return navigation.navigate('UserRegister');
    }

    const { user } = data;
    if (!user.preferredPartner) { // 유저 정보는 있지만 선호하는 친구를 아직 설정하지 않은 경우 (처음 접속하여 회원가입한 경우)
      return navigation.navigate('PreferredPartner');
    }

    // 유저 정보도 있고 선호하는 친구도 설정한 경우
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
