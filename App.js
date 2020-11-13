import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import UserRegisterScreen from './src/screens/UserRegisterScreen';
import PreferredPartnerScreen from './src/screens/PreferredPartnerScreen';
import MainMapScreen from './src/screens/MainMapScreen';
import Loading from './src/components/Loading';
import store from './src/store/'

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ?
        <Loading />
        :
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="PreferredPartner"
                component={PreferredPartnerScreen}
              />
              <Stack.Screen name="MainMap" component={MainMapScreen} />
              <Stack.Screen
                name="UserRegister"
                component={UserRegisterScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      }
    </>
  );
};
export default App;
