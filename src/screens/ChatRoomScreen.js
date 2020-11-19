import React, { useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import MessageBox from '../components/MessageBox';

const ChatRoom = ({ userNickName }) => {
const [message, setMessgae] = useState('');
const partnerNickname = '도토리다람쥐';

//Todo: 메세지 컴포넌트, 기존 메세지 fetch, 소켓 셋팅, 리덕스 connection
  return (
    <Container>
      <Text>ChatRoom</Text>
      <Input
        labele={partnerNickname}
        onChangeText={setMessgae}
        value={message}
      />
      <MessageBox />
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
  align-content: center;
  align-items: center;
`;

export default connect(state => ({
  userNickName: state.user.nickname,
  restaurantName: state.selectedMeeting?.restaurantName,
  partnerNickname: state.selectedMeeting?.partnerNickname,
  meetingId: state.currentMeeting?.meetingId,
}), {
})(ChatRoom);
