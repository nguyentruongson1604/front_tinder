import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const App = () => {
  const [activeButton, setActiveButton] = useState('HOME');
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.topNavigation}>
        <Pressable
          onPress={() => {
            setActiveButton('HOME');
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
          onPress={() => {
            setActiveButton('INFO');
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
          onPress={() => {
            setActiveButton('CHAT');
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
          onPress={() => {
            setActiveButton('USER');
            console.log('abc');
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
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
});

export default App;
