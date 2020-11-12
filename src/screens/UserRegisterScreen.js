import React from 'react';
import { Text, Button } from 'react-native';

const UserRegisterScreen = ({ navigation }) => {
  return(
    <>
      <Text>유저 정보 등록페이지(회원가입)..</Text>
      <Button title="선호하는 친구 페이지로!" onPress={() => navigation.navigate('PreferredPartner')} />
    </>
  );
};

export default UserRegisterScreen;
