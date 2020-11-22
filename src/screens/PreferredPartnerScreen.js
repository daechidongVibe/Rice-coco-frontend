import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Svg, { Polygon } from 'react-native-svg';
import { useNavigationState } from '@react-navigation/native';

import axios from '../config/axiosConfig';
import MY_INFO_OPTIONS from '../constants/myInfoOptions';
import { setUserInfo } from '../actions';
import InputSelector from '../components/InputSelector';

const PreferredPartnerScreen = ({ navigation, user, setUserInfo }) => {
  const navigationState = useNavigationState(state => state);
  const [genderInput, setGenderInput] = useState('남자');
  const [ageInput, setAgeInput] = useState('20대');
  const [occupationInput, setOccupationInput] = useState('개발');
  const [clickedInput, setClickedInput] = useState('');

  useEffect(() => {
    if (user._id) {
      setGenderInput(user.preferredPartner.gender);
      setAgeInput(user.preferredPartner.birthYear);
      setOccupationInput(user.preferredPartner.occupation);

      setClickedInput('gender');
    }
  }, []);

  const handleSubmit = async () => {
    const preferredPartner = {
      gender: genderInput,
      birthYear: ageInput,
      occupation: occupationInput,
    };

    try {
      const { data: { result, updatedUser, errMessage } } = await axios.put(
        `/users/${user._id}/preferred-partner`,
        preferredPartner
      );

      if (result === 'ok') {
        setUserInfo({
          preferredPartner: updatedUser.preferredPartner
        });

        if (navigationState.routes.length >= 2) {
          navigation.goBack();
          return;
        }
        navigation.navigate('MainMap');
        return;
      }

      if (result === 'failure') {
        console.error(errMessage);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const mentMap = {
    gender: '성별을 입력해주세요!',
    age: '나이를 입력해주세요!',
    occupation: '직업을 입력해주세요!',
  };

  const inputMap = {
    gender: {
      input: genderInput,
      inputSelector: setGenderInput,
    },
    age: {
      input: ageInput,
      inputSelector: setAgeInput
    },
    occupation: {
      input: occupationInput,
      inputSelector: setOccupationInput
    },
  };

  const isReadyToSubmit = genderInput && ageInput && occupationInput;

  return (
    <>
      <Header>내가 좋아하는 친구는?</Header>
      <InputDescription>{mentMap[clickedInput]}</InputDescription>
      <View style={{ backgroundColor: 'white' }}>
        <InputSelector
          value={inputMap[clickedInput]?.input}
          setValue={inputMap[clickedInput]?.inputSelector}
          items={MY_INFO_OPTIONS[clickedInput]}
        />
      </View>
      <CircularForm></CircularForm>
      <Svg height="300" width="350" viewBox="0 0 100 100" style={styles.svg}>
        <InputHeader>{genderInput}</InputHeader>
        <Polygon
          points="50 0, 50 50, 6 78, 0 43, 17 12"
          onPress={() => {
            setClickedInput('gender');
          }}
        />
        <InputHeader2>{ageInput}</InputHeader2>
        <Polygon
          points="50 0, 83 12, 100 43, 94 78, 50 50"
          onPress={e => {
            setClickedInput('age');
          }}
        />
        <InputHeader3>{occupationInput}</InputHeader3>
        <Polygon
          points="50 50, 94 78, 70 100, 30 100, 6 78"
          onPress={e => {
            setClickedInput('occupation');
          }}
        />
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
        activeOpacity={0.9}
      >
        <Text style={!isReadyToSubmit ? styles.disabled : styles.text}>
          {!isReadyToSubmit ? 'disabled!' : '친구찾기!'}
        </Text>
      </CircularSubmitButton>
    </>
  );
};

const Header = styled.Text`
  color: #ff914d;
  font-size: 32px;
  font-weight: bold;
  margin: 32px auto;
`;

const InputDescription = styled.Text`
  font-size: 20px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const InputHeader = styled.Text`
  font-size: 20px;
  position: absolute;
  top: 80px;
  left: 13%;
  text-align: center;
  color: white;
  width: 100px;
`;

const InputHeader2 = styled.Text`
  font-size: 20px;
  position: absolute;
  top: 80px;
  right: 14%;
  text-align: center;
  color: white;
  width: 100px;
`;

const InputHeader3 = styled.Text`
  font-size: 20px;
  position: absolute;
  top: 240px;
  right: 37%;
  text-align: center;
  color: white;
  width: 100px;
`;

const CircularForm = styled.TouchableOpacity`
  width: 300px;
  height: 300px;
  border-radius: 300px;
  background-color: #ff914d;
  position: absolute;
  top: 228px;
  left: 25px;
`;

const CircularSubmitButton = styled.TouchableHighlight`
  width: 120px;
  height: 120px;
  border: 3px solid white;
  border-radius: 300px;
  background-color: white;
  color: #ff914d;
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
    color: '#ff914d',
    textAlign: 'center',
  },
});


export default connect(state => ({
    user: state.user,
  }), {
  setUserInfo
})(PreferredPartnerScreen);
