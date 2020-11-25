import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import PickerInput from '../components/PickerInput';
import configuredAxios from '../config/axiosConfig';
import InputSelector from '../components/InputSelector';
import { setUserInfo } from '../actions/index';
import MY_INFO_OPTIONS from '../constants/myInfoOptions';
import ROUTE from '../constants/route';
import { COLOR } from '../constants/assets';
import { StyledInput, InputContainer, Wrapper, Title, StyledButton, P, Container, PickerContainer } from '../shared/index';

import getEnvVars from '../../environment';
const { REACT_NATIVE_RANDOM_NICKNAME_API } = getEnvVars();

const EditUserInfo = ({ navigation, user, userId, setUserInfo }) => {
  const { nickname, birthYear, email, gender, occupation, promise } = user;
  const [nicknameInput, setNicknameInput] = useState(nickname);
  const [occupationInput, setOccupationInput] = useState(occupation);

  const handlePressNicknameRefresher = async () => {
    const {
      data: { words: randomName },
    } = await configuredAxios.get(
      REACT_NATIVE_RANDOM_NICKNAME_API,
    );
    setNicknameInput(randomName[0]);
  };

  const onPressSubmitButton = async () => {
    if (nickname === nicknameInput && occupation === occupationInput) return;

    try {
      const { data : {nickname, occupation} }  = await configuredAxios.put(
        `${ROUTE.USERS}/${userId}`,
        {
          nickname: nicknameInput,
          occupation: occupationInput,
        }
      );
      setUserInfo({ nickname, occupation });
      navigation.goBack();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Wrapper>
      <Title>내 정보 수정</Title>
      <StyledInput
        value={email}
        editable={false}
        color={COLOR.LIGHT_GRAY}
      />
      <Container>
        <StyledInput
          value={occupationInput}
          editable={false}
        />
        <PickerContainer>
          <PickerInput
            onChange={setOccupationInput}
            contentOptions={MY_INFO_OPTIONS.OCCUPATION}
          />
        </PickerContainer>
      </Container>
      <InputContainer
        onPress={handlePressNicknameRefresher}
      >
        <StyledInput
          value={nicknameInput}
          editable={false}
        />
      </InputContainer>
      <StyledInput
        value={gender}
        editable={false}
        color={COLOR.LIGHT_GRAY}
      />
      <StyledInput
        value={birthYear}
        editable={false}
        color={COLOR.LIGHT_GRAY}
      />
      <StyledInput
        value={`프로미스 ${promise.toString()}개`}
        editable={false}
        color={COLOR.LIGHT_GRAY}
      />
      <StyledButton
        onPress={onPressSubmitButton}
      >
        <P color={COLOR.WHITH}>
          수정하기
        </P>
      </StyledButton>
    </Wrapper>
  );
};

export default connect(state => ({
  user: state.user,
  userId: state.user._id,
}), {
  setUserInfo,
}
)(EditUserInfo);
