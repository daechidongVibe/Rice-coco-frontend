import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import asyncStorage from '@react-native-async-storage/async-storage';
import configuredAxios from '../config/axiosConfig';
import PickerInput from '../components/PickerInput';
import MY_INFO_OPTIONS from '../constants/myInfoOptions';
import ReloadImage from '../components/ReloadImage';
import { setUserInfo } from '../actions';
import ALERT from '../constants/alert';
import SCREEN from '../constants/screen';
import { Title, Wrapper, Label, P, StyledInput, Container, StyledButton, InputContainer } from '../shared/index';
import getEnvVars from '../../environment';
import { COLOR } from '../constants/assets';

const {REACT_NATIVE_RANDOM_NICKNAME_API} =  getEnvVars();

const UserRegisterScreen = ({
  route,
  navigation,
  setUserInfo
}) => {
  const { email } = route.params;
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('남자');
  const [occupation, setOccupation] = useState('개발');
  const [birthYear, setBirthYear] = useState('20대');

  useEffect(() => {
    (async () => {
      const {
        data: { words: randomName },
      } = await configuredAxios.get(REACT_NATIVE_RANDOM_NICKNAME_API);

      setNickname(randomName[0]);
    })();
  }, []);

  const handleSubmit = async event => {
    event.target.disabled = true;

    const userInfo = { nickname, gender, occupation, birthYear, email };
    const { data: { result, token, user } } = await configuredAxios.post('/users/signup',
      userInfo,
    );

    if (result === ALERT.OK) {
      await asyncStorage.setItem('token', token);

      setUserInfo(user);
      navigation.navigate('PreferredPartner');
    }
  };

  const handleCreationButtonClick = async () => {
    const {
      data: { words: randomName },
    } = await configuredAxios.get(REACT_NATIVE_RANDOM_NICKNAME_API);

    setNickname(randomName[0]);
  };

  return (
    <Wrapper>
      <Title>내 정보 등록</Title>
      <Label>닉네임</Label>
      <Container>
        <StyledInput
          placeholder='nickname'
          value={nickname}
          editable={false}
          selectTextOnFocus={false}
        />
        <ReloadImage
          onClick={handleCreationButtonClick}
        />
      </Container>
      <InputContainer>
        <PickerInput
          content={gender}
          onChange={setGender}
          contentOptions={MY_INFO_OPTIONS.GENDER}
        />
      </InputContainer>
      <InputContainer>
        <PickerInput
          content={occupation}
          onChange={setOccupation}
          contentOptions={MY_INFO_OPTIONS.OCCUPATION}
        />
      </InputContainer>
      <InputContainer>
        <PickerInput
          content={birthYear}
          onChange={setBirthYear}
          contentOptions={MY_INFO_OPTIONS.AGE}
        />
      </InputContainer>
      <StyledButton onPress={handleSubmit}>
        <P color={COLOR.WHITH}>내 정보 등록하기</P>
      </StyledButton>
    </Wrapper>
  );
};

export default connect(null, { setUserInfo })(UserRegisterScreen);
