import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Loading from '../components/Loading'
import { socket } from '../../socket';
import configuredAxios from '../config/axiosConfig';
import { setCurrentMeeting } from '../actions/index';

const MatchWaiting = ({
  navigation,
  userId,
  currentMeeting,
  setCurrentMeeting,
  selectedMeeting: { meetingId, expiredTime } }) => {
  const [leftTime, setLeftTime] = useState('28:00');
  const [meetingDetails, setMeetingDetails] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await configuredAxios.get(`/meetings/${meetingId}`);
        console.log('새롭게 받아온 미팅 데이터', data);
        setMeetingDetails(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    socket.emit('join meeting', { meetingId, user: userId });

    socket.on('current meeting', data => {
      setCurrentMeeting(data);
    });

    return () => socket.off('current meeting');
  }, []);

  useEffect(() => {
    if (currentMeeting && currentMeeting.users.length === 2) {
      navigation.navigate('MatchSuccessScreen');
    }
  }, [currentMeeting]);

  const handlePressCancelButton = () => {
    console.log('click');
    socket.emit('leaveMeeting', meetingId);
  };

  return (
    <Container>
      <Text>MatchWaiting</Text>
      <Text>{leftTime}</Text>
      <Loading />
      <Text>{meetingDetails.restaurantName}</Text>
      <CancleButton
        onPress={handlePressCancelButton}
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
  background-color: #ffffff;
  margin: auto;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-25px);
`

const mapStateToProps = (
  {
    meetings: { selectedMeeting, currentMeeting }, user: { _id }
  }) => {
  return {
    userId: _id,
    currentMeeting,
    selectedMeeting
  };
}

export default connect(
  mapStateToProps,
  {
    setCurrentMeeting
  }
)(MatchWaiting);
