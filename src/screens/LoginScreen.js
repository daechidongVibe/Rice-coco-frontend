import React from 'react';
import { Button } from 'react-native';
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
    <>
      <StyledLogin>
        <LoginButton onPress={handleLoginButtonClick}>
            <ButtonText>로그인</ButtonText>
        </LoginButton>
      </StyledLogin>
      <Button title="회원가입 (내 정보 등록)" onPress={() => navigation.navigate('UserRegister')} />
    </>
  );
};

const StyledLogin = styled.View`
`;

const LoginButton = styled.TouchableOpacity`
  background-color: brown;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: white;
`;

export default Login;
