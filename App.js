import { Provider } from 'react-redux';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import UserRegisterScreen from './src/screens/UserRegisterScreen';
import PreferredPartnerScreen from './src/screens/PreferredPartnerScreen';
import MainMapScreen from './src/screens/MainMapScreen';
import SearchScreen from './src/screens/SearchScreen';
import RestaurantDetailsScreen from './src/screens/RestaurantDetailsScreen';
import store from './src/store/';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='PreferredPartner' component={PreferredPartnerScreen} />
          <Stack.Screen name='MainMap' component={MainMapScreen} />
          <Stack.Screen name='UserRegister' component={UserRegisterScreen} />
          <Stack.Screen name='search' component={SearchScreen} />
          <Stack.Screen name='RestaurantDetails' component={RestaurantDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
