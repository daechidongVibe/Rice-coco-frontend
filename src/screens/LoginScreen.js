import React from 'react';
import { Button } from 'react-native';
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
    <>
      <StyledLogin>
        <LoginButton onPress={handleLoginButtonClick}>
          <ButtonText>로그인</ButtonText>
        </LoginButton>
      </StyledLogin>
      <Button
        title="회원가입 (내 정보 등록)"
        onPress={() => navigation.navigate('UserRegister')}
      />
    </>
  );
};

const StyledLogin = styled.View``;

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
