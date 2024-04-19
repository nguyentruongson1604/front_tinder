import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {AppNavigator} from './src/navigator';
import {MobxStoreProvider} from './src/store';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {NotifySnackBar} from './src/screens/NotifySnackBar';

const App = () => {
  return (
    <MobxStoreProvider>
      <NativeBaseProvider>
        <AlertNotificationRoot>
          <NavigationContainer>
            {/* <NotifySnackBar /> */}
            <AppNavigator />
          </NavigationContainer>
        </AlertNotificationRoot>
      </NativeBaseProvider>
    </MobxStoreProvider>
  );
};

export default App;
