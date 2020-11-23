import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import axiosInstance from '../config/axiosConfig';
import MY_INFO_OPTIONS from '../constants/myInfoOptions';
import { setUserInfo } from '../actions';
import PickerInput from '../components/PickerInput';
import { Title, Wrapper, StyledSubmitButton, Label } from '../styledComponent/index';

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
  const [birthYear, setBirthYear] = useState('1970');

  useEffect(() => {
    if (userGender) {
      setGender(userGender);
      setOccupation(userOccupation);
      setBirthYear(userBirthYear);
    }
  }, []);

  const handleSubmit = async () => {
    const newPartnerConditions = {
      gender: gender,
      occupation: occupation,
      birthYear: birthYear,
    };

    console.log('newPartnerCOn', newPartnerConditions);
    try {
      const { data: { preferredPartner }} = await axiosInstance.put(
        `/users/${userId}/preferred-partner`,
        newPartnerConditions
      );
        console.log(newPartnerConditions);
      setUserInfo({ preferredPartner });
    } catch (error) {
      console.error(error);
    }

    navigation.navigate('MainMap');
  };

  return (
    <Wrapper>
      <Title>함께 밥을 먹고 싶은 동료는 누구인가요?</Title>
        <Label>성별</Label>
        <PickerInput
          content={gender}
          onChange={setGender}
          contentOptions={MY_INFO_OPTIONS.gender}
        />
        <Label>직업군</Label>
        <PickerInput
          content={occupation}
          onChange={setOccupation}
          contentOptions={MY_INFO_OPTIONS.occupation}
        />
        <Label>태어난 년도</Label>
        <PickerInput
          content={birthYear}
          onChange={setBirthYear}
          contentOptions={MY_INFO_OPTIONS.birthYear}
        />
      <StyledSubmitButton onPress={handleSubmit}>
        <View>
          <Label>내 정보 등록하기</Label>
        </View>
      </StyledSubmitButton>
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
