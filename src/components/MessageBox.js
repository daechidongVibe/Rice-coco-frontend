import React from 'react';
import { Text } from 'react-native';
import {
  StyledText,
  MeesageBoxContainer,
  MessageContainer,
  UserProfile,
} from '../shared';
import { COLOR } from '../constants/color';

const MessageBox = ({ user, message, nickname }) => {
  const lastNickName = nickname.slice(0, 1);
  return (
    <>
      <MeesageBoxContainer direction={user ? 'row' : 'row-reverse'}>
        <MessageContainer color={user ? COLOR.LIGHT_GRAY : COLOR.THEME_COLOR}>
          <StyledText>{message}</StyledText>
        </MessageContainer>
        <UserProfile>
          <Text>{lastNickName}</Text>
        </UserProfile>
      </MeesageBoxContainer>
    </>
  );
};

export default MessageBox;
