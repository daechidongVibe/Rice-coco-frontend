import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import UserRegisterScreen from './src/screens/UserRegisterScreen';
import PreferredPartnerScreen from './src/screens/PreferredPartnerScreen';
import MainMapScreen from './src/screens/MainMapScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="PreferredPartner" component={PreferredPartnerScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainMap" component={MainMapScreen} />
          <Stack.Screen name="UserRegister" component={UserRegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
