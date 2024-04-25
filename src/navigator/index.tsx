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
import {CreateProfileScreen} from '../screens/CreateProfileScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from 'react-native';
import {SettingFindScreen} from '../screens/SettingFindScreen';

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
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: '#F63A6E'},
      }}>
      <Tab.Screen
        name="Image"
        component={EditImageScreen}
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
                Tìm kiếm
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
});
export const AppNavigator = observer(() => {
  const Stack = createNativeStackNavigator();
  const userStore = useUserStore();
  const activityStore = useActivityStore();
  const hobbiesStore = useHobbiesStore();
  const profileStore = useProfileStore();
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
    profileStore.getMyProfile();
    hobbiesStore.getHobbiesType();
    userStore.getCurrentUser();
  }, []);
  // console.log('listProfile in navi', activityStore.listProfile);
  // console.log('oneperson in navi', activityStore.getOnePersonFromList());
  // console.log('oneperson1 in navi', activityStore.curProfile);

  return (
    <Stack.Navigator>
      {/* <NotifySnackBar /> */}
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
