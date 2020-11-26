import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import configuredAxios from '../config/axiosConfig';
import ALERT from '../constants/alert';
import { socket, socketApi } from '../../socket';
import MessageBox from '../components/MessageBox';
import SOCKET_EVENT from '../constants/socket';
import ROUTE from '../constants/route';
import ICON_NAME from '../constants/icon';
import { Wrapper, ListContainer, StyledFlatList } from '../shared/index';

const ChatRoom = ({
  userId,
  nickname,
  meetingId,
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [partnerNickname, setPartnerNickname] = useState('');
  const messageList = useRef(null);

  useEffect(() => {
    if (!messages) return;

    (async () => {
      try {
        const { data: { filteredMessages } } = await configuredAxios.get(`${ROUTE.MEETINGS}/${meetingId}${ROUTE.CHAT}`);
        setMessages(filteredMessages);
      } catch (error) {
        alert(error.message);
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
      await messagePushNotification(nickname, message);
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
          onContentSizeChange={() =>
            messageList.current.scrollToEnd()
          }
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
              name={ICON_NAME.ARROW}
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
