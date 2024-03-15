import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
import SelectImage from './src/components/atoms/SelectImage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopNavigator from './src/components/templates/TopNavigator';
import HomeControl from './src/screens/HomeControl';
import {HomeNavigator} from './src/navigator';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeNavigator}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Info"
            component={InfoScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
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

{
  /* <SafeAreaView style={styles.root}>
 <HomeScreen /> 
 <Welcome /> 
 <Signup /> 
 <ActionsheetCustom /> 
 <InputChoose /> 
 <SliderSelect /> 
 <ImgSelect /> 
 <InfoScreen /> 
 <SelectImage /> 
</SafeAreaView> */
}
