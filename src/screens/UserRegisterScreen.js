import React, { useState } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import asyncStorage from '@react-native-async-storage/async-storage';

import configuredAxios from '../config/axiosConfig';
import PickerInput from '../components/PickerInput';
import MY_INFO_OPTIONS from '../constants/myInfoOptions';
import { setUserInfo } from '../actions';

const UserRegisterScreen = ({ route, navigation, onLogin }) => {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const { email } = route.params;

  const handleSubmit = async () => {
    const userInfo = { nickname, gender, occupation, birthYear, email };

    const { data: { result, token, user } } = await configuredAxios.post(
      'users/signup',
      userInfo
    );

    if (result === 'ok') {
      await asyncStorage.setItem('token', token);

      onLogin(user);

      navigation.navigate('PreferredPartner');
    }
  };

  const handleCreationButtonClick = async () => {
    const {
      data: { words: randomName },
    } = await configuredAxios.get('https://nickname.hwanmoo.kr/?format=json&count=1');

    setNickname(randomName[0]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper>
        <Title>내 정보 등록</Title>
        <InputWrap>
          <Text>닉네임</Text>
          <StyledInput placeholder="nickname" value={nickname} />
          <TouchableOpacity onPress={handleCreationButtonClick}>
            <NameCreationButton>
              <Text>이름 생성하기</Text>
            </NameCreationButton>
          </TouchableOpacity>
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
        </InputWrap>
        <TouchableOpacity onPress={handleSubmit}>
          <StyledSubmitButton>
            <Text>내 정보 등록하기</Text>
          </StyledSubmitButton>
        </TouchableOpacity>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  border: 1px solid black;
  padding: 100px 50px 100px 50px;
`;

const Title = styled.Text`
  text-align: center;
  color: #ff914d;
  font-size: 30px;
  font-weight: bold;
`;

const InputWrap = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.TextInput`
  width: 300px;
  height: 50px;
  background-color: white;
  margin-bottom: 10px;
  text-align: center;
`;

const NameCreationButton = styled.View`
  padding: 10px;
  width: 100%;
  background-color: #ff914d;
  margin-bottom: 10px;
`;

const StyledSubmitButton = styled.View`
  padding: 10px;
  background-color: #ff914d;
`;

const mapDispatchToProps = dispatch => ({
  onLogin(user) {
    dispatch(setUserInfo(user));
  },
});

export default connect(null, mapDispatchToProps)(UserRegisterScreen);
