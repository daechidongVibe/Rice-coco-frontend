import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as TaskManager from 'expo-task-manager';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeStackScreen from './src/screens/HomeStackScreen';
import SearchScreen from './src/screens/SearchScreen';
import MyPageStackScreen from './src/screens/MyPageStackScreen';
import { setUserLocation } from './src/actions/index';
import store from './src/store/';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'map-marker-alt';
          } else if (route.name === 'MyPage') {
            iconName = focused ? 'list-alt' : 'list-ul';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search-location' : 'search';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ff914d',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="MyPage" component={MyPageStackScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

TaskManager.defineTask('background-location-task', ({ data, error }) => {
  if (error) {
    alert(error.message);
    return;
  }
  const { latitude, longitude } = data.locations[0].coords;

  store.dispatch(setUserLocation({ latitude, longitude }));
});
