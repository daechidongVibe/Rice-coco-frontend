import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen from './MyPageScreen';
import EditUserInfoScreen from './EditUserInfoScreen';
import PreferredPartnerScreen from './PreferredPartnerScreen';
import PaymentScreen from './PaymentScreen';

const MyPageStack = createStackNavigator();

const MyPageStackScreen = () => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen name='MyPage' component={MyPageScreen} />
      <MyPageStack.Screen name="EditUserInfo" component={EditUserInfoScreen} />
      <MyPageStack.Screen name="PreferredPartner" component={PreferredPartnerScreen} />
      <MyPageStack.Screen name="Payment" component={PaymentScreen} />
    </MyPageStack.Navigator>
  );
};

export default MyPageStackScreen;
