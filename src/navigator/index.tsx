/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/react-in-jsx-scope */
import {SafeAreaView, View} from 'react-native';
import TopNavigator from '../components/templates/TopNavigator';
import HomeScreen from '../screens/HomeScreen';
import SelectImage from '../components/atoms/SelectImage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InfoScreen from '../screens/InfoScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import {useUserStore} from '../store';
import {observer} from 'mobx-react-lite';

export const HomeNavigator = observer(() => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <TopNavigator />
      </View>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Switch"
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
});

export const AppNavigator = observer(() => {
  const Stack = createNativeStackNavigator();
  const userStore = useUserStore();

  return (
    <Stack.Navigator>
      {!userStore.userAccess ? (
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
});

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
