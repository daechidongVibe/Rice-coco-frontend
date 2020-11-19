import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import RotatedIcon from '../components/RotatedIcon';
import { socket, socketApi } from '../../socket';
import configuredAxios from '../config/axiosConfig';
import { setCurrentMeeting, setSelectedMeeting } from '../actions/index';
import RemainingTime from "../components/RemainingTime";

const MatchWaiting = ({
  navigation,
  userId,
  currentMeeting,
  setSelectedMeeting,
  setCurrentMeeting,
  selectedMeeting: { meetingId, expiredTime, restaurantName },
}) => {
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { meetingDetails },
        } = await configuredAxios.get(`/meetings/${meetingId}`);
        // restaurantName, expiredTime만 온다.
        console.log('새롭게 받아온 미팅 데이터', meetingDetails);

        setSelectedMeeting(meetingDetails);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    socketApi.joinMeeting(meetingId, userId);

    socket.on('current meeting', data => {
      setCurrentMeeting(data);
    });

    return () => socket.off('current meeting');
  }, []);

  useEffect(() => {
    if (currentMeeting?.users?.length === 2) {
      navigation.navigate('MatchSuccess');
    }
  }, [currentMeeting]);

  const handlePressCancelButton = async () => {
    socketApi.cancelMeeting(meetingId);

    const result = await configuredAxios.delete(`/meetings/${meetingId}`);

    navigation.dispatch(
      StackActions.replace('MainMap')
    );
  };
  return (
    <Container>
      <Text>MatchWaiting</Text>
      <RemainingTime expiredTime={expiredTime} />
      <RotatedIcon />
      <Text>{restaurantName}</Text>
      <CancleButton onPress={handlePressCancelButton} title="취소하기" />
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
`;

const mapStateToProps = ({
  meetings: { selectedMeeting, currentMeeting },
  user: { _id },
}) => {
  return {
    userId: _id,
    currentMeeting,
    selectedMeeting,
  };
};

export default connect(mapStateToProps, {
  setCurrentMeeting,
  setSelectedMeeting,
})(MatchWaiting);
