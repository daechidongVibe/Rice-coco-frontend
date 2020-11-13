import React from 'react';
import { ImageBackground } from 'react-native';

const Loading = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/ricecoco_splash.png')}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Loading;
