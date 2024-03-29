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
import {useActivityStore, useUserStore} from '../store';
import {observer} from 'mobx-react-lite';
import {useEffect} from 'react';

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
  const activityStore = useActivityStore();
  // const removeToken = async () => {
  //   try {
  //     await AsyncStorage.removeItem('accessToken');
  //     console.log('Token removed successfully');
  //   } catch (error) {
  //     console.error('Error removing token: ', error);
  //   }
  // };

  // removeToken();
  useEffect(() => {
    activityStore.loadInitListProfiles();
  }, []);
  // console.log('listProfile in navi', activityStore.listProfile);
  // console.log('oneperson in navi', activityStore.getOnePersonFromList());
  // console.log('oneperson1 in navi', activityStore.curProfile);

  return (
    <Stack.Navigator>
      {userStore.accessToken ? (
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
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeNavigator}
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
