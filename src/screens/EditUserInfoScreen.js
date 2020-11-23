import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import configuredAxios from '../config/axiosConfig';
import InputSelector from '../components/InputSelector';
import { setUserInfo } from '../actions/index';
import MY_INFO_OPTIONS from '../constants/myInfoOptions';

const EditUserInfo = ({ navigation, user, userId, setUserInfo }) => {
  const { nickname, birthYear, email, gender, occupation, promise } = user;

  const [isEdited, setIsEdited] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(nickname);
  const [occupationInput, setOccupationInput] = useState(occupation);

  useEffect(() => {
    (async () => {
      // 유저 정보 다시 가져와서 리덕스에 세팅 (프로미스 바뀐 경우 반영)
      const { data: user } = await configuredAxios.get(`/users/${userId}`);

      const { promise } = user;

      setUserInfo({ promise });
    })();

    setNicknameInput(nickname);
    setOccupationInput(occupation);
  }, []);

  useEffect(() => {
    const didUserEditedNicknameInput = nickname !== nicknameInput;
    const didUserEditedOccupationInput = occupation !== occupationInput;

    if (didUserEditedNicknameInput || didUserEditedOccupationInput) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [nicknameInput, occupationInput]);

  const handlePressNicknameRefresher = async () => {
    const {
      data: { words: randomName },
    } = await configuredAxios.get(
      'https://nickname.hwanmoo.kr/?format=json&count=1'
    );

    setNicknameInput(randomName[0]);
  };

  const onPressSubmitButton = async () => {
    try {
      const { data: updatedUser } = await configuredAxios.put(
        `/users/${userId}`,
        {
          nickname: nicknameInput,
          occupation: occupationInput,
        }
      );
      const { nickname, occupation } = updatedUser;

      setUserInfo({ nickname, occupation });
      alert('업데이트 성공!');
      navigation.goBack();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <Container>
        <Header>내 정보 수정</Header>

        <InputHeader>E-MAIL</InputHeader>
        <InputContainer>
          <Input
            value={email}
            editable={false}
            style={{ color: 'lightgray' }}
          />
        </InputContainer>

        <InputHeader>닉네임</InputHeader>
        <InputContainer>
          <Input value={nicknameInput} editable={false} />
          <TouchableOpacity onPress={handlePressNicknameRefresher}>
            <MaterialIcons
              name="refresh"
              size={30}
              color="white"
              style={{
                width: 30,
                height: 30,
                color: '#ff914d',
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
        </InputContainer>

        <InputHeader>직업</InputHeader>
        <PickerWrapper>
          <InputSelector
            value={occupationInput}
            setValue={setOccupationInput}
            styleObj={{ paddingVertical: 10, paddingHorizontal: 10 }}
            items={MY_INFO_OPTIONS.occupation}
          />
        </PickerWrapper>

        <InputHeader>성별</InputHeader>
        <InputContainer>
          <Input
            value={gender}
            editable={false}
            style={{ color: 'lightgray' }}
          />
        </InputContainer>

        <InputHeader>나이</InputHeader>
        <InputContainer>
          <Input
            value={birthYear}
            editable={false}
            style={{ color: 'lightgray' }}
          />
        </InputContainer>

        <InputHeader>프로미스</InputHeader>
        <InputContainer>
          <Input
            value={promise.toString()}
            editable={false}
            style={{ color: 'lightgray' }}
          />
        </InputContainer>
        <Wrapper>
          <SubmitButton
            disabled={isEdited ? false : true}
            onPress={onPressSubmitButton}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              수정하기
            </Text>
          </SubmitButton>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.ScrollView`
  height: 100%;
  padding: 0 15%;
  overflow: scroll;
`;

const Header = styled.Text`
  color: #ff914d;
  font-size: 32px;
  font-weight: bold;
  margin: 25px auto;
  margin-bottom: 20px;
`;

const InputHeader = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  background-color: white;
`;

const Input = styled.TextInput`
  padding: 8px 10px;
  color: black;
  flex: 1;
`;

const PickerWrapper = styled.View`
  background-color: white;
  margin-bottom: 10px;
`;

const Wrapper = styled.View`
  width: 100%;
  display: flex;
`;

const SubmitButton = styled.TouchableOpacity`
  align-self: center;
  padding: 13px 20px;
  margin-top: 5px;
  margin-bottom: 15px;
  background-color: ${props => (props.disabled ? 'gray' : '#ff914d')};
`;

export default connect(
  state => ({
    user: state.user,
    userId: state.user._id,
  }),
  {
    setUserInfo,
  }
)(EditUserInfo);
