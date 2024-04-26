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
import {
  useActivityStore,
  useHobbiesStore,
  useProfileStore,
  useUserStore,
} from '../store';
import {observer} from 'mobx-react-lite';
import {useEffect} from 'react';
import EditHobbyScreen from '../screens/EditHobbyScreen';
import {SettingScreen} from '../screens/SettingScreen';
import {EditProfileHeader} from '../components/templates/EditProfileHeader';
import {EditImageScreen} from '../screens/EditImageScreen';
import {NotifySnackBar} from '../screens/NotifySnackBar';
import {ResetPassScreen} from '../screens/ResetPassScreen';
import {
  CreateProfileScreen,
  TopCreateNavigator,
} from '../components/templates/TopCreateNavigator';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from 'react-native';
import {SettingFindScreen} from '../screens/SettingFindScreen';
import {EditImgCreateScreen} from '../screens/EditImgCreateScreen';

export const EditProfileNavigator = observer(() => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{flex: 1}}>
      <EditProfileHeader />
      <Stack.Navigator initialRouteName="EditPicture">
        <Stack.Screen
          options={{headerShown: false}}
          name="EditPicture"
          component={EditImageScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="EditHobby"
          component={EditHobbyScreen}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
});

export const HomeNavigator = observer(() => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <NotifySnackBar />
        <TopNavigator />
      </View>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Switch"
          component={CreateProfileTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Setting"
          component={SettingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Detail"
          component={EditProfileNavigator}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
});

export const CreateProfileTabs = observer(() => {
  const hobbiesStore = useHobbiesStore();

  useEffect(() => {
    hobbiesStore.getHobbiesType();
  }, []);
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TopCreateNavigator />
      <Tab.Navigator
        swipeEnabled={false}
        screenOptions={{
          tabBarIndicatorStyle: {backgroundColor: '#F63A6E'},
        }}>
        <Tab.Screen
          name="Image"
          component={EditImgCreateScreen}
          options={{
            tabBarLabel: ({focused, color}) => (
              <View
                style={{
                  minWidth: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: focused ? '#F63A6E' : '#b5b5b5',
                    fontSize: focused ? 18 : 16,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}>
                  Ảnh
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Info"
          component={EditHobbyScreen}
          options={{
            tabBarLabel: ({focused, color}) => (
              <View
                style={{
                  minWidth: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: focused ? '#F63A6E' : '#b5b5b5',
                    fontSize: focused ? 18 : 16,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}>
                  Thông tin
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Finding"
          component={SettingFindScreen}
          options={{
            tabBarLabel: ({focused}) => (
              <View
                style={{
                  minWidth: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: focused ? '#F63A6E' : '#b5b5b5',
                    fontSize: focused ? 18 : 16,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}>
                  Tìm kiếm
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
});
export const MainNavigator = observer(() => {
  const Stack = createNativeStackNavigator();
  const activityStore = useActivityStore();
  const hobbiesStore = useHobbiesStore();
  const profileStore = useProfileStore();
  const userStore = useUserStore();

  useEffect(() => {
    activityStore.loadInitListProfiles();
    profileStore.getMyProfile();
    hobbiesStore.getHobbiesType();
    userStore.getCurrentUser();
  }, []);
  return (
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
  );
});
export const AppNavigator = observer(() => {
  const Stack = createNativeStackNavigator();
  const userStore = useUserStore();

  console.log('userStore.accessToken', userStore.accessToken);
  return (
    <Stack.Navigator>
      {userStore.accessToken ? (
        <Stack.Screen
          options={{headerShown: false}}
          name="Main"
          component={MainNavigator}
        />
      ) : (
        <>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Resetpass"
            component={ResetPassScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Register"
            component={RegisterScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="CreateProfile"
            component={CreateProfileTabs}
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
