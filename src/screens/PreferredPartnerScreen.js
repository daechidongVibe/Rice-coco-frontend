import React, { useState, useRef } from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import Svg, { Polygon } from 'react-native-svg';

import axios from '../config/axiosConfig';
import NavigationBar from '../components/NavigationBar';

const PreferredPartnerScreen = ({ navigation, userId }) => {
  const [genderInput, setGenderInput] = useState('');
  const [ageInput, setAgeInput] = useState('');
  const [occupationInput, setOccupationInput] = useState('');

  const [clickedGenderInput, setClickedGenderInput] = useState(true);
  const [clickedAgeInput, setClickedAgeInput] = useState(false);
  const [clickedOccupationInput, setClickedOccupationInput] = useState(false);

  const handleSubmit = async () => {
    const preferredPartner = {
      gender: genderInput,
      birthYear: ageInput,
      occupation: occupationInput,
    };

    setGenderInput('');
    setAgeInput('');
    setOccupationInput('');

    try {
      const { data: { result, errMessage }} = await axios.put(
        `/users/${userId}/preferred-partner`,
        preferredPartner
      );

      if (result === 'ok') {
        console.log('선호 친구 정보 업데이트 성공!');
        navigation.navigate('MainMap');
        return;
      }

      if (result === 'failure') {
        alert('서버 에러..유저 정보 업데이트에 실패했습니다!');
        console.log('왜 알러트 안떠..');
        console.log(errMessage);
      }
    } catch (err) {
      console.log(`유저 정보 업데이트 시도 중 에러 발생..${err}`);
    }
  };

  function checkClickedInput() {
    if (clickedGenderInput) {
      return 'genderInput';
    }

    if (clickedAgeInput) {
      return 'ageInput';
    }

    if (clickedOccupationInput) {
      return 'occupationInput';
    }
  }

  const mentMap = {
    genderInput: '성별을 입력해주세요!',
    ageInput: '나이를 입력해주세요!',
    occupationInput: '직업을 입력해주세요!',
  };

  const isReadyToSubmit = genderInput && ageInput && occupationInput;

  return (
    <>
      <Header>내가 좋아하는 친구는?</Header>
      <InputDescription>{mentMap[checkClickedInput()]}</InputDescription>

      {clickedGenderInput && (
        <TextInput
          value={genderInput}
          maxLength={5}
          onChangeText={text => setGenderInput(text)}
          autoFocus
        />
      )}

      {clickedAgeInput && (
        <TextInput
          value={ageInput}
          maxLength={5}
          onChangeText={text => setAgeInput(text)}
          autoFocus
        />
      )}

      {clickedOccupationInput && (
        <TextInput
          value={occupationInput}
          maxLength={5}
          onChangeText={text => setOccupationInput(text)}
          autoFocus
        />
      )}

      <CircularForm></CircularForm>

      <Svg height="300" width="350" viewBox="0 0 100 100" style={styles.svg}>
        <Polygon
          points="50 0, 50 50, 6 78, 0 43, 17 12"
          stroke="black"
          onPress={() => {
            setClickedGenderInput(true);
            setClickedAgeInput(false);
            setClickedOccupationInput(false);
          }}
        />
        <InputHeader>{genderInput}</InputHeader>
        <Polygon
          points="50 0, 83 12, 100 43, 94 78, 50 50"
          stroke="black"
          onPress={e => {
            setClickedGenderInput(false);
            setClickedAgeInput(true);
            setClickedOccupationInput(false);
          }}
        />
        <InputHeader2>{ageInput}</InputHeader2>
        <Polygon
          points="50 50, 94 78, 70 100, 30 100, 6 78"
          stroke="black"
          onPress={e => {
            setClickedGenderInput(false);
            setClickedAgeInput(false);
            setClickedOccupationInput(true);
          }}
        />
        <InputHeader3>{occupationInput}</InputHeader3>
      </Svg>

      <CircularSubmitButton
        onPress={() => {
          if (!isReadyToSubmit) {
            alert('모든 인풋을 입력하셔야 합니다!');
            return;
          }

          handleSubmit();
        }}
        style={!isReadyToSubmit && styles.disabled}
      >
        <Text style={!isReadyToSubmit ? styles.disabled : styles.text}>
          {!isReadyToSubmit ? 'disabled!' : '친구찾기!'}
        </Text>
      </CircularSubmitButton>

      <NavigationBar />
    </>
  );
};

const Header = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin: 32px auto;
  color: #ff914d;
`;

const InputDescription = styled.Text`
  font-size: 20px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const InputHeader = styled.Text`
  font-size: 20px;
  position: absolute;
  top: 80;
  left: 16%;
  text-align: center;
  background-color: white;
  width: 100px;
`;
const InputHeader2 = styled.Text`
  font-size: 20px;
  position: absolute;
  top: 80;
  right: 17%;
  text-align: center;
  background-color: white;
  width: 100px;
`;
const InputHeader3 = styled.Text`
  font-size: 20px;
  position: absolute;
  top: 240;
  right: 37%;
  text-align: center;
  background-color: white;
  width: 100px;
`;

const TextInput = styled.TextInput`
  background-color: #fff;
  padding: 10px;
`;

const CircularForm = styled.TouchableOpacity`
  width: 300px;
  height: 300px;
  border-radius: 300px;
  background-color: white;
  position: absolute;
  top: 228px;
  left: 25px;
`;

const CircularSubmitButton = styled.TouchableHighlight`
  width: 120px;
  height: 120px;
  border: 4px solid black;
  border-radius: 300px;
  background-color: #ff914d;
  position: absolute;
  top: 370px;
  left: 50%;
  transform: translate(-65px, -50px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  svg: {
    marginVertical: 20,
    position: 'relative',
    top: 10,
  },
  disabled: {
    backgroundColor: 'black',
    color: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

const mapStateToProps = ({ user: { _id } }) => {
  return {
    userId: _id
  };
};

export default connect(mapStateToProps, null)(PreferredPartnerScreen);
