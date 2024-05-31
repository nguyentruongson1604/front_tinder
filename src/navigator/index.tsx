/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/react-in-jsx-scope */
import {SafeAreaView, View} from 'react-native';
import TopNavigator from '../components/templates/TopNavigator';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InfoScreen from '../screens/InfoScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import {
  useActivityStore,
  useHobbiesStore,
  useProfileStore,
  useSocket,
  useUserStore,
} from '../store';
import {observer} from 'mobx-react-lite';
import {useCallback, useEffect} from 'react';
import EditHobbyScreen from '../screens/EditHobbyScreen';
import {SettingScreen} from '../screens/SettingScreen';
import {EditProfileHeader} from '../components/templates/EditProfileHeader';
import {EditImageScreen} from '../screens/EditImageScreen';
import {NotifySnackBar} from '../screens/NotifySnackBar';
import {ResetPassScreen} from '../screens/ResetPassScreen';
import {TopCreateNavigator} from '../components/templates/TopCreateNavigator';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from 'react-native';
import {SettingFindScreen} from '../screens/SettingFindScreen';
import {EditImgCreateScreen} from '../screens/EditImgCreateScreen';
import {ActivityIndicator} from 'react-native';
import {ChannelListScreen} from '../screens/ListMatchScreen';
import {ChatScreen} from '../screens/ChatScreen';
import Geolocation from '@react-native-community/geolocation';

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

export const MessageNavigator = observer(() => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator initialRouteName="MessageChannel">
        <Stack.Screen
          options={{headerShown: false}}
          name="MessageChannel"
          component={ChannelListScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="MessageChat"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
});

export const HomeNavigator = observer(() => {
  const Stack = createNativeStackNavigator();
  const profileStore = useProfileStore();
  const socket = useSocket();
  useEffect(() => {
    socket.on('getNewMatch', res => {
      const newMatchProfile = res;
      profileStore.listMatch = [newMatchProfile, ...profileStore.listMatch];
    });
    return () => {
      socket.off('getNewMatch');
    };
  }, [profileStore, socket]);
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
          component={HomeScreen}
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
        <Stack.Screen
          options={{headerShown: false}}
          name="Message"
          component={MessageNavigator}
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
  const socket = useSocket();

  const init = async () => {
    /* ***LOCATION IN HERE***  */
    // Geolocation.getCurrentPosition(
    //   async position => {
    //     const {longitude, latitude} = position.coords;
    //     await profileStore.updateLocation({longitude, latitude});
    //     console.log('{latitude, longitude}', {longitude, latitude});
    //   },
    //   error => console.log(error),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    // );
    await profileStore.getMyProfile();
    await profileStore.getListMatch();
    await hobbiesStore.getHobbiesType();
    await userStore.getCurrentUser();
    await activityStore.loadInitListProfiles();
  };
  useEffect(() => {
    init();
    if (userStore.userAccess?._id) {
      socket.emit('addNewUsers', userStore.userAccess?._id);
    }
    socket.on('getNotify', res => {
      console.log('socket in hereeeeee');
    });

    return () => {
      socket.off('addNewUsers');
      socket.off('getNotify');
    };
  }, []);

  if (activityStore.loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={'red'} />
      </View>
    );
  }
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
  const profileStore = useProfileStore();
  console.log('userStore.accessToken', userStore.accessToken);
  // userStore.logout();
  useEffect(() => {
    profileStore.checkExistPofile();
  }, []);
  // console.log('profileStore.existProfile', profileStore.existProfile);

  // if (userStore.loading || profileStore.loading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" color={'red'} />
  //     </View>
  //   );
  // }
  return (
    <Stack.Navigator>
      {userStore.accessToken ? (
        profileStore.existProfile ? (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Main"
              component={MainNavigator}
            />
          </>
        ) : (
          <Stack.Screen
            options={{headerShown: false}}
            name="CreateProfile"
            component={CreateProfileTabs}
          />
        )
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
        </>
      )}
    </Stack.Navigator>
  );
});
