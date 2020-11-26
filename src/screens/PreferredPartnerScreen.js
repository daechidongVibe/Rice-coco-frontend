import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axiosInstance from '../config/axiosConfig';
import { setUserInfo } from '../actions';
import PickerInput from '../components/PickerInput';
import ROUTE from '../constants/route';
import SCREEN from '../constants/screen';
import { COLOR } from '../constants/color';
import MY_INFO_OPTIONS from '../constants/myInfoOptions';
import {
  Title,
  Wrapper,
  StyledButton,
  P,
  InputContainer,
  Label,
} from '../shared/index';

const PreferredPartnerScreen = ({
  navigation,
  userGender,
  userOccupation,
  userBirthYear,
  setUserInfo,
  userId,
}) => {
  const [gender, setGender] = useState('남자');
  const [occupation, setOccupation] = useState('개발');
  const [birthYear, setBirthYear] = useState('20대');

  useEffect(() => {
    if (userGender) {
      setGender(userGender);
      setOccupation(userOccupation);
      setBirthYear(userBirthYear);
    }
  }, []);

  const handleSubmit = async () => {
    const newPartnerConditions = {
      gender,
      birthYear,
      occupation,
    };

    try {
      const { data: { preferredPartner } } = await axiosInstance.put(
        `${ROUTE.USERS}/${userId}${ROUTE.PREFERRED_PARTNER}`,
        newPartnerConditions
      );
      setUserInfo({ preferredPartner });
    } catch (error) {
      console.warn(error);
    }

    navigation.navigate(SCREEN.MAIN_MAP);
  };

  return (
    <Wrapper>
      <Title>함께 밥을 먹고 싶은 동료는 누구인가요?</Title>
      <Label>gender</Label>
      <InputContainer>
        <PickerInput
          content={gender}
          onChange={setGender}
          contentOptions={MY_INFO_OPTIONS.GENDER}
        />
      </InputContainer>
      <Label>occupation</Label>
      <InputContainer>
        <PickerInput
          content={occupation}
          onChange={setOccupation}
          contentOptions={MY_INFO_OPTIONS.OCCUPATION}
        />
      </InputContainer>
      <Label>age</Label>
      <InputContainer>
        <PickerInput
          content={birthYear}
          onChange={setBirthYear}
          contentOptions={MY_INFO_OPTIONS.AGE}
        />
      </InputContainer>
      <StyledButton onPress={handleSubmit}>
        <P color={COLOR.WHITE}>나의 라이스코코</P>
      </StyledButton>
    </Wrapper>
  );
};

export default connect(state => ({
  userId: state.user._id,
  userGender: state.user.preferredPartner.gender,
  userOccupation: state.user.preferredPartner.occupation,
  userBirthYear: state.user.preferredPartner.birthYear,
}), {
  setUserInfo
})(PreferredPartnerScreen);
