import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import PreferredPartnerScreen from './PreferredPartnerScreen';
import MyPageScreen from './MyPageScreen';

const MyPageStack = createStackNavigator();

const MyPageStackScreen = () => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen name="MyPage" component={MyPageScreen} />
      <MyPageStack.Screen name="PreferredPartner" component={PreferredPartnerScreen} />
    </MyPageStack.Navigator>
  );
};

export default connect(
  null,
  null
)(MyPageStackScreen)
