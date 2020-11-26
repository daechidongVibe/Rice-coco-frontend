import React from 'react';
import { Text } from 'react-native';
import { P, MeesageBoxContainer, MessageContainer, UserProfile } from '../shared'
import { COLOR } from '../constants/color';

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
          color={user ? COLOR.LIGHT_GRAY : COLOR.THEME_COLOR}
        >
          <P>{message}</P>
        </MessageContainer>
        <UserProfile><Text>{lastNickName}</Text></UserProfile>
      </MeesageBoxContainer>
    </>
  );
};

export default MessageBox;
