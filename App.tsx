import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import Signup from './src/screens/SignUpScreen';
import Welcome from './src/screens/Welcome';
import {NativeBaseProvider} from 'native-base';
import ActionsheetCustom from './src/components/atoms/ActionSheet';
import MatchScreen from './src/screens/MatchScreen';
import {InputChoose} from './src/components/atoms/InputChoose';
import SliderSelect from './src/components/atoms/SliderSelect';
import ImgSelect from './src/components/atoms/ImgSlider';
import InfoScreen from './src/screens/InfoScreen';

const App = () => {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.root}>
        {/* <HomeScreen /> */}
        {/* <Welcome /> */}
        {/* <Signup /> */}
        {/* <ActionsheetCustom /> */}
        {/* <InputChoose /> */}
        {/* <SliderSelect /> */}
        {/* <ImgSelect /> */}
        <InfoScreen />
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    // padding: 10,
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    // padding: 10,
  },
  iconWrap: {
    width: 50,
    height: 50,
  },
});

export default App;
