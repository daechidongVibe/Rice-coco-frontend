import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen from './MyPageScreen';
import EditUserInfoScreen from './EditUserInfoScreen';
import PreferredPartnerScreen from './PreferredPartnerScreen';
import PaymentScreen from './PaymentScreen';
import SCREEN from '../constants/screen';

const MyPageStack = createStackNavigator();

const MyPageStackScreen = () => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen name={SCREEN.MY_PAGE} component={MyPageScreen} />
      <MyPageStack.Screen name={SCREEN.EDIT_USER_INFO} component={EditUserInfoScreen} />
      <MyPageStack.Screen name={SCREEN.PREFERRED_PARTNER} component={PreferredPartnerScreen} />
      <MyPageStack.Screen name={SCREEN.PAYMENT} component={PaymentScreen} />
    </MyPageStack.Navigator>
  );
};

export default MyPageStackScreen;
