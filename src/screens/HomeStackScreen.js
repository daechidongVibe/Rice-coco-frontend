import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import UserRegisterScreen from './UserRegisterScreen';
import PreferredPartnerScreen from './PreferredPartnerScreen';
import MainMapScreen from './MainMapScreen';
import SearchScreen from './SearchScreen';
import RestaurantDetailsScreen from './RestaurantDetailsScreen';
import MatchWaitingScreen from './MatchWaitingScreen';
import MatchSuccessScreen from './MatchSuccessScreen';
import ChatRoomScreen from './ChatRoomScreen';
import AfterMeetingScreen from './AfterMeetingScreen';
import SCREEN from '../constants/screen';
const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName={SCREEN.LOGIN} headerMode='none'>
      <HomeStack.Screen name={SCREEN.LOGIN} component={LoginScreen} />
      <HomeStack.Screen name={SCREEN.PREFERRED_PARTNER} component={PreferredPartnerScreen} />
      <HomeStack.Screen name={SCREEN.MAIN_MAP} component={MainMapScreen} />
      <HomeStack.Screen name={SCREEN.USER_REGISTER} component={UserRegisterScreen} />
      <HomeStack.Screen name={SCREEN.SEARCH} component={SearchScreen} />
      <HomeStack.Screen name={SCREEN.RESTAURANT_DETAILS} component={RestaurantDetailsScreen} />
      <HomeStack.Screen name={SCREEN.MATCH_WAITING} component={MatchWaitingScreen} />
      <HomeStack.Screen name={SCREEN.MATCH_SUCCESS} component={MatchSuccessScreen} />
      <HomeStack.Screen name={SCREEN.CHAT_ROOM} component={ChatRoomScreen} />
      <HomeStack.Screen name={SCREEN.AFTER_MEETING} component={AfterMeetingScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
