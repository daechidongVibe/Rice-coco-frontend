import React from 'react';
import { Text, Button } from 'react-native';

const MainMapScreen = ({ navigation }) => {
  return (
    <>
      <Text>메인 맵입니다..-_-;</Text>
      <Button title="돌아가기" onPress={() => navigation.goBack()} />
    </>
  );
};

export default MainMapScreen;
