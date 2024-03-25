import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {AppNavigator} from './src/navigator';
import {MobxStoreProvider} from './src/store';

const App = () => {
  return (
    <MobxStoreProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </MobxStoreProvider>
  );
};

export default App;
