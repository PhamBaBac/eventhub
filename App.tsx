import React, {useEffect, useState} from 'react';
import AuthNavigator from './src/routers/AuthNavigator';
import SplashScreen from './src/screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

const App = () => {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsSplash(false);
    }, 1500);
    return () => clearTimeout(timeOut);
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {isSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
