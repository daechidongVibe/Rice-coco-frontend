import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { sub, format } from 'date-fns';

const RemainingTime = ({ expiredTime }) => {
  const [remainingTime, setRemainingTime] = useState('');
  const [subtractTime, setSubtractTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = sub(expiredTime, { seconds: subtractTime });
      const formattedTime = format(currentTime, 'mm:ss');

      if (formattedTime === '00:00') {
        clearInterval(intervalId);
        return;
      }

      setSubtractTime(subtractTime + 1);
      setRemainingTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  });

  return (
    <View>
      <Text>{remainingTime}</Text>
    </View>
  );
};

export default RemainingTime;
