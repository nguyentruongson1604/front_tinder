import {SafeAreaView, View} from 'react-native';
import TopNavigator from '../components/templates/TopNavigator';
import HomeScreen from '../screens/HomeScreen';
import SelectImage from '../components/atoms/SelectImage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InfoScreen from '../screens/InfoScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

export const HomeNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <TopNavigator />
      </View>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Detail"
          component={SelectImage}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  const isAuthenticated = false;
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
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
        </>
      ) : (
        <>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Register"
            component={RegisterScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

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
