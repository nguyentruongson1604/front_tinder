import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {AppNavigator} from './src/navigator';
import {MobxStoreProvider} from './src/store';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    // if (SplashScreen) {
    console.log('here');

    SplashScreen.hide();
    // }
  }, []);
  return (
    <MobxStoreProvider>
      <NativeBaseProvider>
        <AlertNotificationRoot>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AlertNotificationRoot>
      </NativeBaseProvider>
    </MobxStoreProvider>
  );
};

export default App;
