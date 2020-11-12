import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const Loading = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/ricecoco_splash.png')}
      style={styles.image}
    >
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Loading;
