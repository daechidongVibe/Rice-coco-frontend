import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import asyncStorage from '@react-native-async-storage/async-storage';

import configuredAxios from '../config/axiosConfig';
import PickerInput from '../components/PickerInput';
import MY_INFO_OPTIONS from '../constants/myInfoOptions';
import { setUserInfo } from '../actions';
import { Title } from '../styledComponent/index';

const UserRegisterScreen = ({ route, navigation, setUserInfo }) => {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('남자');
  const [occupation, setOccupation] = useState('개발');
  const [birthYear, setBirthYear] = useState('1970');
  const { email } = route.params;

  useEffect(() => {
    (async () => {
      const {
        data: { words: randomName },
      } = await configuredAxios.get(
        'https://nickname.hwanmoo.kr/?format=json&count=1'
      );

      setNickname(randomName[0]);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.target.disabled = true;

    const userInfo = { nickname, gender, occupation, birthYear, email };

    const { data: { result, token, user } } = await configuredAxios.post(
      'users/signup',
      userInfo
    );

    if (result === 'ok') {
      await asyncStorage.setItem('token', token);

      setUserInfo(user);

      navigation.navigate('PreferredPartner');
    }
  };

  const handleCreationButtonClick = async () => {
    const {
      data: { words: randomName },
    } = await configuredAxios.get(
      'https://nickname.hwanmoo.kr/?format=json&count=1'
    );

    setNickname(randomName[0]);
  };

  return (
    <Wrapper>
      <Title>내 정보 등록</Title>
      <Text>닉네임</Text>
      <NameInput
        placeholder="nickname"
        value={nickname}
        editable={false}
        selectTextOnFocus={false}
      />
      <NameCreationButton onPress={handleCreationButtonClick}>
        <View>
          <Text>이름 자동 생성하기</Text>
        </View>
      </NameCreationButton>
      <Text>성별</Text>
      <PickerInput
        content={gender}
        onChange={setGender}
        contentOptions={MY_INFO_OPTIONS.gender}
      />
      <Text>직업군</Text>
      <PickerInput
        content={occupation}
        onChange={setOccupation}
        contentOptions={MY_INFO_OPTIONS.occupation}
      />
      <Text>태어난 년도</Text>
      <PickerInput
        content={birthYear}
        onChange={setBirthYear}
        contentOptions={MY_INFO_OPTIONS.birthYear}
      />
      <StyledSubmitButton onPress={handleSubmit}>
        <View>
          <Text>내 정보 등록하기</Text>
        </View>
      </StyledSubmitButton>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  height: 100%;
  display: flex;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const NameInput = styled.TextInput`
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  background-color: white;
`;

const NameCreationButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  background-color: #ff914d;
`;

const StyledSubmitButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  background-color: #ff914d;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export default connect(null, { setUserInfo })(UserRegisterScreen);
