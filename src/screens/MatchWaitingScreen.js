import React, { useEffect, useState } from 'react';
import { Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import { setCurrentMeeting, setSelectedMeeting } from '../actions/index';
import RemainingTime from '../components/RemainingTime';
import RotatedIcon from '../components/RotatedIcon';
import { socket, socketApi } from '../../socket';
import configuredAxios from '../config/axiosConfig';
import resetAction from '../utils/navigation';
import ALERT from '../constants/alert';
import SCREEN from '../constants/screen';
import ROUTE from '../constants/route';
import SOCKET_EVENT from '../constants/socket';

const MatchWaiting = ({
  navigation,
  userId,
  currentMeeting,
  setSelectedMeeting,
  setCurrentMeeting,
  meetingId,
  expiredTime,
  restaurantName,
}) => {
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { meetingDetails },
        } = await configuredAxios.get(`${ROUTE.MEETINGS}/${meetingId}`);

        setSelectedMeeting(meetingDetails);
      } catch (error) {
        console.warn(error);
      }
    })();
  }, []);

  useEffect(() => {
    socketApi.joinMeeting(meetingId, userId);

    socket.on(SOCKET_EVENT.CHANGE_CURRENT_MEETING, data => {
      setCurrentMeeting(data);
      setIsStart(true);
    });

    return () => socket.off(SOCKET_EVENT.CHANGE_CURRENT_MEETING);
  }, []);

  useEffect(() => {
    if (currentMeeting.users?.length === 2) {
      (async () => {
        const partnerId = currentMeeting.users.find(user => user !== userId);
        const { data: partner } = await configuredAxios.get(`users/${partnerId}`);
        const partnerNickname = partner.nickname;

        setSelectedMeeting({ partnerNickname });

        navigation.dispatch(resetAction(0, SCREEN.MATCH_SUCCESS));
      })();
    }
  }, [currentMeeting]);

  const handlePressCancelButton = async () => {
    socketApi.cancelMeeting(() => {
      navigation.dispatch(StackActions.replace(SCREEN.MAIN_MAP));
    });
  };

  const handleTimeEnd = async () => {
    socketApi.cancelMeeting(() => {
      Alert.alert(
        ALERT.TIME_OUT_TITLE,
        ALERT.TIME_OUT_MESSAGE,
        [
          {
            text: ALERT.OK,
            onPress: () =>
              navigation.dispatch(resetAction(0, MAIN_MAP)),
          },
        ],
        { cancelable: false }
      );
    });
  };

  return (
    <Container>
      <Text>MatchWaiting</Text>
      {
        !!expiredTime && (
          <RemainingTime expiredTime={expiredTime} onTimeEnd={handleTimeEnd} />
        )
      }
      <RotatedIcon start={isStart} />
      <Text>{restaurantName}</Text>
      <CancelButton onPress={handlePressCancelButton} title='취소하기' />
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
export default connect(
  state => ({
    userId: state.user._id,
    currentMeeting: state.meetings.currentMeeting,
    meetingId: state.meetings.selectedMeeting.meetingId,
    expiredTime: state.meetings.selectedMeeting.expiredTime,
    restaurantName: state.meetings.selectedMeeting.restaurantName,
  }),
  {
    setCurrentMeeting,
    setSelectedMeeting,
  }
)(MatchWaiting);
