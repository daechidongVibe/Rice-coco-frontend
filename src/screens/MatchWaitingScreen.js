import React, { useEffect, useState } from 'react';
import { Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { StackActions, useNavigationState } from '@react-navigation/native';

import { setCurrentMeeting, setSelectedMeeting } from '../actions/index';
import RemainingTime from '../components/RemainingTime';
import RotatedIcon from '../components/RotatedIcon';
import { socket, socketApi } from '../../socket';
import configuredAxios from '../config/axiosConfig';

const MatchWaiting = ({
  navigation,
  userId,
  currentMeeting,
  setSelectedMeeting,
  setCurrentMeeting,
  selectedMeeting: { meetingId, expiredTime, restaurantName },
}) => {
  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    console.log('생성 이후 네비게이션 히스토리!!!!!!',navigationState.routes);

    (async () => {
      try {
        const {
          data: { meetingDetails },
        } = await configuredAxios.get(`/meetings/${meetingId}`);
        // restaurantName, expiredTime만 온다.
        // console.log('새롭게 받아온 미팅 데이터', meetingDetails);

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

    return () => socketApi.removeAllListeners();
  }, []);

  useEffect(() => {
    if (currentMeeting?.users?.length === 2) {
      navigation.dispatch(StackActions.replace('MatchSuccess'));
    }
  }, [currentMeeting]);

  const handlePressCancelButton = async () => {
    socketApi.cancelMeeting(meetingId, () => {
      navigation.dispatch(StackActions.replace('MainMap'));
    });
  };

  const handleTimeEnd = async () => {
    socketApi.cancelMeeting(meetingId, () => {
      Alert.alert(
        '미팅 성사 시간 종료',
        '안타깝게도 혼자 드셔야겠네요',
        [
          {
            text: 'OK',
            onPress: () => navigation.dispatch(StackActions.replace('MainMap')),
          },
        ],
        { cancelable: false }
      );
    });
  };

  return (
    <Container>
      <Text>MatchWaiting</Text>
      {!!expiredTime && (
        <RemainingTime expiredTime={expiredTime} onTimeEnd={handleTimeEnd} />
      )}
      <RotatedIcon />
      <Text>{restaurantName}</Text>
      <CancelButton onPress={handlePressCancelButton} title="취소하기" />
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

const CancelButton = styled.Button`
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
