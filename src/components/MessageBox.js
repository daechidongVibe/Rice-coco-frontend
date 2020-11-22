import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const MessageBox = ({
  user,
  message,
  nickname,
  }) => {
const lastNickName = nickname.slice(0, 1);

  return (
    <>
      <MeesageBoxContainer
        direction={user ? 'row' : 'row-reverse'}
        >
        <MessageContainer
          color={user ? '#fbf6f0' : '#f7dad9'}
          >
          <Message>{message}</Message>
        </MessageContainer>
          <UserProfile><Text>{lastNickName}</Text></UserProfile>
      </MeesageBoxContainer>
    </>
  );
};

export default MessageBox;

const MeesageBoxContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.direction}
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 9px;
`;

const MessageContainer = styled.View`
  width: 180px;
  height: 40px;
  padding: 8px;
  align-items: flex-end;
  background-color: ${props => props.color}
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const Message = styled.Text`
  font-size: 18px;
`;

const UserProfile = styled.View`
  width: 24px;
  height: 24px;
  background-color: #d6d2c4;
  border-radius: 100px;
  padding: 4px;
`;
