import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { sub, format, parseISO } from 'date-fns';
import styled from 'styled-components';

const RemainingTime = ({ expiredTime, onTimeEnd }) => {
  const [remainingTime, setRemainingTime] = useState('59:59');

  const calculateRemaingTime = () => {
    const parsedTime = parseISO(expiredTime);
    const remainingTime = format(parsedTime - Date.now(), 'mm:ss');

    setRemainingTime(remainingTime);
  }

  useEffect(() => {
    calculateRemaingTime();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime === '00:00') {
        clearInterval(intervalId);
        onTimeEnd && onTimeEnd();

        return;
      }

      calculateRemaingTime();
    }, 1000);

    return () => clearInterval(intervalId);
  });

  return (
    <Wrapper>
      <TimeText>{remainingTime}</TimeText>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const TimeText = styled.Text`
  text-align: center;
  background-color: black;
  padding: 10px;
  width: 40%;
  color: white;
  font-weight: bold;
  border: 2px solid white;
`;

export default RemainingTime;
