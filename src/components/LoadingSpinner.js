import React from "react";
import { ActivityIndicator, View } from 'react-native';

const LoadingSpinner = () => {
  return (
  <View>
    <ActivityIndicator size="large" color="#ff914d" />
  </View>
  );
};

export default LoadingSpinner;
