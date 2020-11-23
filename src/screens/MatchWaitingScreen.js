import React, { useEffect, useState } from 'react';
import { Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { StackActions, CommonActions } from '@react-navigation/native';
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
        } = await configuredAxios.get(`/meetings/${meetingId}`);

        setSelectedMeeting(meetingDetails);
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  useEffect(() => {
    socketApi.joinMeeting(meetingId, userId);

    socket.on('change current meeting', data => {
      setCurrentMeeting(data);
      setIsStart(true);
    });

    return () => socket.off('change current meeting');
  }, []);

  useEffect(() => {
    if (currentMeeting.users?.length === 2) {
      (async () => {
        const partnerId = currentMeeting.users.find(user => user !== userId);
        const { data: partner } = await configuredAxios.get(
          `users/${partnerId}`
        );
        const partnerNickname = partner.nickname;

        setSelectedMeeting({ partnerNickname });

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'MatchSuccess',
              },
            ],
          })
        );
      })();
    }
  }, [currentMeeting]);

  const handlePressCancelButton = async () => {
    socketApi.cancelMeeting(() => {
      navigation.dispatch(StackActions.replace('MainMap'));
    });
  };
  const handleTimeEnd = async () => {
    socketApi.cancelMeeting(() => {
      Alert.alert(
        '미팅 성사 시간 종료',
        '안타깝게도 혼자 드셔야겠네요',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'MainMap',
                    },
                  ],
                })
              ),
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
      <RotatedIcon start={isStart} />
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
