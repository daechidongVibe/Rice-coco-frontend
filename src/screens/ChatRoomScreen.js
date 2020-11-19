import React, { useState, useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import MessageBox from '../components/MessageBox';
import configuredAxios from '../config/axiosConfig';

const ChatRoom = ({
  userId,
  userNickName,
  partnerNickname,
  restaurantName,
}) => {
  const [message, setMessgae] = useState('');
  const [beforeChat, setBeforeChat] = useState([]);
  const mockMeetingId = '5fb60f270254b62b04774263';
  //Todo: 소켓 셋팅

  useEffect(() => {
    (async () => {
      try {
        const {data : {filteredMessages}}  = await configuredAxios.get(`/meetings/${mockMeetingId}/chat`);
        setBeforeChat(filteredMessages);
      } catch (err) {
        console.error(err);
      }
    })();
  },[]);

  return (
    <Container>
      <Text>ChatRoom</Text>
      <MessageList
        data={beforeChat}
        renderItem={({ item }) => (
          <MessageBox
            user={item.author === userId}
            message={item.message}
          />
        )}
      />
      <Input
        labele={partnerNickname}
        onChangeText={setMessgae}
        value={message}
        errorMessage={message ? '다람쥐님에게' : '메세지를 입력해주세요'}
      />
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  padding: 40px;
  background-color: #9D7D65;
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
  restaurantName: state.selectedMeeting?.restaurantName,
  userNickName: state.user.nickname,
  partnerNickname: state.selectedMeeting?.partnerNickname,
  meetingId: state.currentMeeting?.meetingId,
}), {
})(ChatRoom);
