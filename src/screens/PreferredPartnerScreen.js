import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Svg, { Polygon } from 'react-native-svg';

import NavigationBar from '../components/NavigationBar';

const PreferredPartnerScreen = ({ navigation, userId }) => {
  const [genderInput, setGenderInput] = useState('');
  const [ageInput, setAgeInput] = useState('');
  const [occupationInput, setOccupationInput] = useState('');

  const [clickedGenderInput, setClickedGenderInput] = useState(true);
  const [clickedAgeInput, setClickedAgeInput] = useState(false);
  const [clickedOccupationInput, setClickedOccupationInput] = useState(false);

  const handleSubmit = async () => {
    const userInfo = {
      gender: genderInput,
      birthYear: ageInput,
      occupation: occupationInput
    };

    setGenderInput('');
    setAgeInput('');
    setOccupationInput('');

    console.log(userInfo);

    await axios.put(
      `/users/${userId}/preferred-partner`,
      {
        userInfo
      }
    );
  };

  return (
    <>
      <Header>
        내가 좋아하는 친구는?
      </Header>
      <Text>
        선호하는 친구 정보를 입력하세요!
      </Text>

      { clickedGenderInput &&
        <TextInput
          value={genderInput}
          maxLength={5}
          onChangeText={(text) => setGenderInput(text)}
          autoFocus
        />
      }

      { clickedAgeInput &&
        <TextInput
          value={ageInput}
          maxLength={5}
          onChangeText={(text) => setAgeInput(text)}
          autoFocus
        />
      }

      { clickedOccupationInput &&
        <TextInput
          value={occupationInput}
          maxLength={5}
          onChangeText={(text) => setOccupationInput(text)}
          autoFocus
        />
      }

      {/* <CircularForm>
        <GenderSelectButton />
        <CircularSubmitButton>
          <Text>Find my friends!</Text>
        </CircularSubmitButton>
      </CircularForm> */}

      <Svg
        height="300"
        width="350"
        viewBox="0 0 100 100"
        style={styles.genderInputContainer}
      >
        <Polygon
          points="50 0, 50 50, 6 78, 0 43, 17 12"
          stroke="black"
          fill="white"
          onPress={() => {
            setClickedGenderInput(true);
            setClickedAgeInput(false);
            setClickedOccupationInput(false);
          }}
        />
        <Polygon
          points="50 0, 83 12, 100 43, 94 78, 50 52"
          stroke="black"
          fill="white"
          onPress={(e) => {
            setClickedGenderInput(false);
            setClickedAgeInput(true);
            setClickedOccupationInput(false);
          }}
        />
        <Polygon
          points="50 50, 94 78, 70 100, 30 100, 6 78"
          stroke="black"
          fill="white"
          onPress={(e) => {
            setClickedGenderInput(false);
            setClickedAgeInput(false);
            setClickedOccupationInput(true);
          }}
        />
        <InputHeader>{genderInput}</InputHeader>
        <InputHeader2>{ageInput}</InputHeader2>
        <InputHeader3>{occupationInput}</InputHeader3>
      </Svg>

      <CircularSubmitButton onPress={handleSubmit}>
        <Text>Find my friends!</Text>
      </CircularSubmitButton>

      <Button title='메인지도로!' onPress={() => navigation.navigate('MainMap')} />
      <Button title='돌아가기' onPress={() => navigation.goBack()} />
      <NavigationBar/>
    </>
  );
};

const Header = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin: 16px auto;
`;

const InputHeader = styled.Text`
  font-size: 20px;
  position: absolute;
  top: 80;
  left: 16%;
  text-align: center;
`;
const InputHeader2 = styled.Text`
  font-size: 20px;
  position: absolute;
  top: 80;
  right: 17%;
  text-align: center;
`;
const InputHeader3 = styled.Text`
  font-size: 20px;
  position: absolute;
  top: 240;
  right: 37%;
  text-align: center;
`;

const TextInput = styled.TextInput`
  background-color: #fff;
  padding: 10px;
`;

const CircularForm = styled.TouchableOpacity`
  width: 250px;
  height: 250px;
  border-radius: 300px;
  background-color: brown;
  margin: 20px auto;
  position: relative;
`;

const CircularSubmitButton = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  border: 2px solid black;
  border-radius: 300px;
  background-color: white;
  position: absolute;
  top: 320px;
  left: 50%;
  transform: translate(-65px, -50px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  genderInputContainer: {
    marginVertical: 20,
    position: 'relative',
    top: 10
  },
  ageInputContainer: {
    marginVertical: 30,
    position: 'relative',
    top: -350
  },
  occupationInputContainer: {
    marginVertical: 30,
    position: 'relative',
    top: -710
  }
});

const mapStateToProps = ({ user: { userId } }) => {
  return {
    userId
  };
}

export default connect(
  mapStateToProps,
  null
)(PreferredPartnerScreen);
