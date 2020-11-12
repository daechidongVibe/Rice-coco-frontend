import React from 'react';
import { Text, Button } from 'react-native';

const PreferredPartnerInfo = ({ navigation }) => {
  return (
    <>
      <Text>
        선호하는 친구 정보 설정 페이지
      </Text>
      <Button title='메인지도로!' onPress={() => navigation.navigate('MainMap')} />
      <Button title='돌아가기' onPress={() => navigation.goBack()} />
    </>
  );
};

export default PreferredPartnerInfo;
