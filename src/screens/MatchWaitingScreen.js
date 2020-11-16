import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import SandGlass from '../components/Sandglass'

const MatchWaiting = ({ navigation, selectedMeeting }) => {

  return (
    <Container>
      <Text>MatchWaiting</Text>
      <SandGlass />
      <Text>{selectedMeeting.restaurantName}</Text>
      <Text>{selectedMeeting.restaurantName}</Text>
      <CancleButton
        title='취소하기'
      />
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  padding: 40px;
  background-color: #ff914d;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
`;

const CancleButton = styled.Button`
  background-color: #ffffff
  margin: auto;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-25px);
`;

export default connect(state => ({
  selectedMeeting: state.meetings.selectedMeeting,
}))(MatchWaiting);
