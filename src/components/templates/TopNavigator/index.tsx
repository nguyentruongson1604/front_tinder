/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export type RootStackParamList = {
  Home: undefined;
  Info: undefined;
  Detail: undefined;
  // khai báo các screen khác tại đây
};
const TopNavigator = () => {
  const [activeButton, setActiveButton] = useState('HOME');
  const navigation = useNavigation();

  const removeToken = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  };

  return (
    <View>
      <View style={styles.topNavigation}>
        <Pressable
          style={styles.iconWrap}
          onPress={() => {
            setActiveButton('HOME');
            navigation.navigate('Switch');
          }}>
          <FontistoIcon
            name="tinder"
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              color: activeButton === 'HOME' ? '#F63A6E' : '#b5b5b5',
            }}
          />
        </Pressable>
        {/* <AntDesign
          name="qrcode"
          style={{fontWeight: 'bold', fontSize: 24, color: '#F63A6E'}}
        /> */}
        <Pressable
          style={styles.iconWrap}
          onPress={() => {
            setActiveButton('INFO');
            removeToken();
          }}>
          <MaterialCommunityIcons
            name="star-four-points"
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              color: activeButton === 'INFO' ? '#F63A6E' : '#b5b5b5',
            }}
          />
        </Pressable>
        <Pressable
          style={styles.iconWrap}
          onPress={() => {
            setActiveButton('CHAT');
            navigation.navigate('Detail');
          }}>
          <AntDesign
            name="wechat"
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              color: activeButton === 'CHAT' ? '#F63A6E' : '#b5b5b5',
            }}
          />
        </Pressable>
        <Pressable
          style={styles.iconWrap}
          onPress={() => {
            setActiveButton('USER');
            navigation.navigate('Setting');
          }}>
          <FontAwesome
            name="user"
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              color: activeButton === 'USER' ? '#F63A6E' : '#b5b5b5',
            }}
          />
        </Pressable>
      </View>
      {/* <View style={{flex: 1}}>{children}</View> */}
    </View>
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

export default TopNavigator;
