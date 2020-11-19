import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import asyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './LoginScreen';
import UserRegisterScreen from './UserRegisterScreen';
import PreferredPartnerScreen from './PreferredPartnerScreen';
import MainMapScreen from './MainMapScreen';
import SearchScreen from './SearchScreen';
import RestaurantDetailsScreen from './RestaurantDetailsScreen';
import MatchWaitingScreen from './MatchWaitingScreen';
import MatchSuccessScreen from './MatchSuccessScreen';
import ChatRoomScreen from './ChatRoomScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Login" headerMode="none">
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="PreferredPartner" component={PreferredPartnerScreen} />
      <HomeStack.Screen name="MainMap" component={MainMapScreen} />
      <HomeStack.Screen name="UserRegister" component={UserRegisterScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} />
      <HomeStack.Screen name="MatchWaiting" component={MatchWaitingScreen} />
      <HomeStack.Screen name="MatchSuccess" component={MatchSuccessScreen} />
      <HomeStack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </HomeStack.Navigator>
  );
};

export default connect(
  null,
  null
)(HomeStackScreen);
