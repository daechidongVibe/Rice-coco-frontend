import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import MessageBox from '../components/MessageBox';
import configuredAxios from '../config/axiosConfig';
import ALERT from '../constants/alert';
import { socket, socketApi } from '../../socket';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Wrapper, ListContainer, StyledFlatList } from '../shared/index';
import SOCKET_EVENT from '../constants/socket';

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

  const notificationListener = useRef();
  const responseListener = useRef();
  const messageList = useRef(null);

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

    notificationListener.current = Notifications.addNotificationReceivedListener();

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

      } catch (error) {
        console.warn(error);
      }
    })();
  }, []);

  useEffect(() => {
    socket.on(SOCKET_EVENT.MESSAGE, ({ userId, nickname, message }) => {
      setPartnerNickname(nickname);
      setMessages(pre => [...pre, { userId, nickname, message }]);
    });

    return () => socket.off(SOCKET_EVENT.MESSAGE);
  }, []);

  useEffect(() => {
    socket.on(SOCKET_EVENT.NOTIFICATION_RECIVED, async ({ nickname, message }) => {
      await messagePushNotification(nickname, message)
    });

    return () => socket.off(SOCKET_EVENT.NOTIFICATION_RECIVED);
  }, []);

  const handleMessageSubmit = async () => {
    if (!message) return;

    socketApi.sendMessage(userId, nickname, message, () => setMessage(''));
    socketApi.sendNotification(nickname, message);
  };

  return (
    <Wrapper>
      <ListContainer>
        <StyledFlatList
          ref={messageList}
          onContentSizeChange={() => {
            messageList.current.scrollToEnd();
          }}
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
          errorMessage={message ? `${partnerNickname}님에게 메세지를 전달하세요` : ALERT.SHOULD_ENTER_MESSAGE}
          rightIcon={
            <Icon
              name='arrow-alt-circle-up'
              size={24}
              onPress={handleMessageSubmit}
            />
          }
        />
      </ListContainer>
    </Wrapper>
  );
};

export default connect(state => ({
  userId: state.user._id,
  nickname: state.user.nickname,
  meetingId: state.meetings.currentMeeting.meetingId,
}))(ChatRoom);
