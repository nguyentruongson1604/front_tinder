import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {AppNavigator} from './navigator';
import {MobxStoreProvider} from './store';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';
import {
  PERMISSIONS,
  Permission,
  PermissionStatus,
  check,
  requestMultiple,
} from 'react-native-permissions';
// import {io} from 'socket.io-client';

const App = () => {
  const requestPermistion = useCallback(async () => {
    if (Platform.OS === 'android') {
      const requestList: Permission[] = [];
      const checkLocation1: PermissionStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      );
      if (checkLocation1 !== 'granted') {
        requestList.push(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
      }
      const checkLocation2: PermissionStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (checkLocation2 !== 'granted') {
        requestList.push(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      }
      const camera: PermissionStatus = await check(PERMISSIONS.ANDROID.CAMERA);
      if (camera !== 'granted') {
        requestList.push(PERMISSIONS.ANDROID.CAMERA);
      }
      await requestMultiple(requestList);
    }
  }, []);
  useEffect(() => {
    requestPermistion();
    SplashScreen.hide();
  }, [requestPermistion]);
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
