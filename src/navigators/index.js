import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import UserRegisterScreen from '../screens/UserRegisterScreen';
import PreferredPartnerScreen from '../screens/PreferredPartnerScreen';
import MainMapScreen from '../screens/MainMapScreen';
import SearchScreen from '../screens/SearchScreen';
import RestaurantDetailsScreen from '../screens/RestaurantDetailsScreen';
import MatchWaitingScreen from '../screens/MatchWaitingScreen';
import MatchSuccessScreen from '../screens/MatchSuccessScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import AfterMeetingScreen from '../screens/AfterMeetingScreen';
import MyPageScreen from '../screens/MyPageScreen';
import EditUserInfoScreen from '../screens/EditUserInfoScreen';
import PaymentScreen from '../screens/PaymentScreen';

const MyPageStack = createStackNavigator();
const HomeStack = createStackNavigator();

const MyPageStackScreen = () => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen name="MyPage" component={MyPageScreen} />
      <MyPageStack.Screen name="EditUserInfo" component={EditUserInfoScreen} />
      <MyPageStack.Screen name="PreferredPartner" component={PreferredPartnerScreen} />
      <MyPageStack.Screen name="Payment" component={PaymentScreen} />
    </MyPageStack.Navigator>
  );
};

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
      <HomeStack.Screen name="AfterMeeting" component={AfterMeetingScreen} />
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'md-home';
          } else if (route.name === 'MyPage') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ff914d',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="MyPage" component={MyPageStackScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
