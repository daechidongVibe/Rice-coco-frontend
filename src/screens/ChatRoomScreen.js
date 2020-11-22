import React, { useState, useEffect, useRef } from 'react';
import { Text, Button, Platform } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import MessageBox from '../components/MessageBox';
import configuredAxios from '../config/axiosConfig';
import { SHOULD_ENTER_MESSAGE } from '../constants/messages';
import { socket, socketApi } from '../../socket';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const ChatRoom = ({
  userId,
  nickname,
  meetingId,
  navigation,
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [partnerNickname, setPartnerNickname] = useState('');
//memo: 현재는 chatroom 컴포넌트 내에서만 상대방메세지 수신 알림 가능. 분리해서 전역에서 알림 가능하게 할 예정입니다
  const notificationListener = useRef();
  const responseListener = useRef();

  async function messagePushNotification(nickname, message) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got message! 📬",
        body: `${nickname}: ${message}`,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      navigation.navigate('MatchSuccess');
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    if (!messages) return;
    (async () => {
      try {
        const { data: { filteredMessages } } = await configuredAxios.get(`/meetings/${meetingId}/chat`);
        setMessages(filteredMessages);

      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    socket.on('message', ({ userId, nickname, message }) => {
      setPartnerNickname(nickname);
      setMessages(pre => [...pre, { userId, nickname, message }]);
    });

    return () => socket.off('message');
  }, []);

  useEffect(() => {
    socket.on('notification recived', async ({ nickname, message }) => {
      await messagePushNotification(nickname, message)
    });

    return () => socket.off('notification recived');
  }, []);
  
  const handleMessageSubmit = async () => {
    if (!message) return;

    socketApi.sendMessage(userId, nickname, message, () => setMessage(''));
    socketApi.sendNotification(nickname, message);
  };

  return (
    <Container>
      <Text>ChatRoom</Text>
      <MessageList
        data={messages}
        renderItem={({ item }) => (
          <MessageBox
            user={item.userId === userId}
            message={item.message}
            nickname={item.nickname}
          />
        )}
      />
      <Input
        onChangeText={setMessage}
        value={message}
        errorMessage={message ? `${partnerNickname}님에게 메세지를 전달하세요` : SHOULD_ENTER_MESSAGE}
        onSubmitEditing={handleMessageSubmit}
      />
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  padding: 20px;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;

const MessageList = styled.FlatList`
  width: 100%;
  margin: 0 auto;
`;

export default connect(state => ({
  userId: state.user._id,
  nickname: state.user.nickname,
  meetingId: state.meetings.currentMeeting?.meetingId,
}))(ChatRoom);
