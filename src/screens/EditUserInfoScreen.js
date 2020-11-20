import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { MaterialIcons, Feather } from '@expo/vector-icons';

import configuredAxios from '../config/axiosConfig';

const EditUserInfo = ({ user }) => {
  console.log('리덕스에 들어있는 유저 정보..', user);

  const {
    nickname,
    birthYear,
    email,
    gender,
    occupation,
    promise
  } = user;

  const [isEdited, setIsEdited] = useState(false);
  const [localNickname, setLocalNickname] = useState('');

  useEffect(() => {
    setLocalNickname(nickname);
  }, []);

  const handlePressNicknameRefresher = async () => {
    const {
      data: { words: randomName }
    } = await configuredAxios.get(
      'https://nickname.hwanmoo.kr/?format=json&count=1'
    );

    setLocalNickname(randomName[0]);
    setIdEdited(true);
  };

  const handlePressOccupationEditIcon = () => {
    //

    setIdEdited(true);
  };

  return (
    <>
      <Container>
        <Header>내 정보 수정</Header>

        <InputHeader>E-MAIL</InputHeader>
        <InputContainer>
          <Input value={email} editable={false} style={{ color: 'lightgray' }} />
        </InputContainer>

        <InputHeader>닉네임</InputHeader>
        <InputContainer>
          <Input value={localNickname} editable={false} />
          <TouchableOpacity onPress={handlePressNicknameRefresher} >
            <MaterialIcons
              name="refresh"
              size={30}
              color="white"
              style={{ width: 30, height: 30, color: '#ff914d', marginRight: 10 }}
            />
          </TouchableOpacity>
        </InputContainer>

        <InputHeader>직업</InputHeader>
        <InputContainer>
          <Input value={occupation} editable={false} />
          <TouchableOpacity onPress={handlePressOccupationEditIcon} >
            <Feather
              name="edit-2"
              size={24}
              color="black"
              style={{ width: 24, height: 24, color: '#ff914d', marginRight: 12 }}
            />
          </TouchableOpacity>
        </InputContainer>

        <InputHeader>성별</InputHeader>
        <InputContainer>
          <Input value={gender} editable={false} style={{ color: 'lightgray' }} />
        </InputContainer>

        <InputHeader>나이</InputHeader>
        <InputContainer>
          <Input value={birthYear} editable={false} style={{ color: 'lightgray' }} />
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
          <SubmitButton disabled={isEdited ? false : true} >
            <Text style={{ color: 'white', textAlign: 'center' }}>수정하기</Text>
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
  margin: 32px auto;
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

const Wrapper = styled.View`
  width: 100%;
  display: flex;
`;

const SubmitButton = styled.TouchableOpacity`
  align-self: center;
  padding: 13px 20px;
  background-color: ${props => props.disabled ? 'gray' : '#ff914d'};
`;

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(
  mapStateToProps,
  null
)(EditUserInfo);
