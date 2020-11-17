import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import SandGlass from '../components/Sandglass'
import { socket } from '../../socket';
import configuredAxios from '../config/axiosConfig';
import { setCurrentMeeting } from '../actions/index';

const MatchWaiting = ({ navigation, userId, currentMeeting, setCurrentMeeting }) => {
  const [leftTime, setLeftTime] = useState('28:00');
  const [meetingDetails, setMeetingDetails] = useState({});

  const meetingId = '5fb27cf65d219516a38d0e95';

  useEffect(() => {
    (async () => {
      try {
        const { data } = await configuredAxios.get(`/meetings/${meetingId}`);
        setMeetingDetails(data);
      } catch(err) {
        console.log(123123);
      }

    })();
  }, []);

  useEffect(() => {
    socket.emit('join meeting', { meetingId, user: userId });

    socket.on('current meeting', data => {
      console.log('socketRoom', data)
      setCurrentMeeting(data);
    });
    
    return () => socket.off('current meeting');
  }, []);

  useEffect(() => {
    console.log('current', currentMeeting);
    if (currentMeeting && currentMeeting.users.length === 2) {
      navigation.navigate('MatchSuccessScreen');
    }
  }, [currentMeeting]);

  const handleCancleButtonClick = () => {
    socket.emit('disconnect', meetingId);
  };

  return (
    <Container>
      <Text>MatchWaiting</Text>
      <Text>{leftTime}</Text>
      <SandGlass />
      <Text>{meetingDetails.restaurantName}</Text>
      <CancleButton
        onPress={handleCancleButtonClick}
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
`

export default connect(state => ({
  mockMeetings: state.meetings.filteredMeetings,
  selectedMeeting: state.meetings.selectedMeeting,
  userId: state.user._id,
  currentMeeting: state.meetings.currentMeeting
}), {
  setCurrentMeeting
}
)(MatchWaiting);
