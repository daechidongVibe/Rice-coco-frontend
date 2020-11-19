import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import configuredAxios from '../config/axiosConfig';

const AfterMeetingScreen = ({ userId, meetingId }) => {
  useEffect(() => {
    // 마운트 되면 해당 미팅을 유저 히스토리로 추가
    const { data } = configuredAxios.put(
      `users/${userId}/history`,
      { meetingId }
    );

    if (data.result === 'SUCCESS') {
      return;
    }

    if (data.result === 'FAILURE') {
      // console.log(data.result.errMessage);
    }
  });

  return (
    <Container>
      <Text>안녕! 미팅이 완료되었습니다 ^^</Text>
    </Container>
  );
};

const Container = styled.View`
  background-color: yellowgreen;
`;

const Text = styled.Text`
  color: brown;
`;

const mapStateToProps = ({
  user: { _id: userId },
  meeting: { selectedMeeting: { meetingId } }
}) => {
  return {
    userId,
    meetingId
  };
}

export default connect(
  mapStateToProps,
  null
)(AfterMeetingScreen);
