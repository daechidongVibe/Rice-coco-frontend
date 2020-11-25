import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Easing } from 'react-native-reanimated';

const ReloadImage = ({ onClick }) => {
  const spinAnim = new Animated.Value(0);
  const startAnimation = () => {
    spinAnim.setValue(0);
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      startAnimation();
    });
  };

  const handleClick = () => {
    startAnimation();
    onClick();
  };

  return (
    <Wrapper
      onPress={handleClick}
      style={{
        transform: [{
          rotate: spinAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['360deg', '0deg'],
          }),
        }],
      }}
    >
      <SimpleLineIcons name="reload" size={24} color="black" />
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  display: flex;
  align-items: center;
`;

export default ReloadImage;
