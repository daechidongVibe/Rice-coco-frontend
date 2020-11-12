import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState }from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from './src/components/Loading';

export default App = () => {
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(false);
    }, 3000);
  }, []);

  return (
    <>
      {
        isLoaded ?
         <Loading />
          :
          <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style='auto' />
          </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
