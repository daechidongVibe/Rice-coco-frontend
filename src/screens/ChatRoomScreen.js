import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import MessageBox from '../components/MessageBox';
import configuredAxios from '../config/axiosConfig';
import { SHOULD_ENTER_MESSAGE } from '../constants/messages';
import { socket, socketApi } from '../../socket';

const ChatRoom = ({
  userId,
  nickname,
  meetingId,
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [partnerNickname, setPartnerNickname] = useState('');

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

  const handleMessageSubmit = () => {
    if (!message) return;
    socketApi.sendMessage(userId, nickname, message, () => setMessage(''));
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
