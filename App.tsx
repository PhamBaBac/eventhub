import React, {useEffect, useState} from 'react';
import AuthNavigator from './src/routers/AuthNavigator';
import SplashScreen from './src/screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsSplash(false);
    }, 2000);
    return () => clearTimeout(timeOut);
  }, []);
  return isSplash ? (
    <SplashScreen />
  ) : (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default App;
