import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const App = () => {
  const [activeButton, setActiveButton] = useState('INFO');
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.topNavigation}>
        <Pressable
          style={styles.iconWrap}
          onPress={() => {
            setActiveButton('HOME');
            console.log('HOME');
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
            console.log('INFO');
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
            console.log('CHAT');
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
            console.log('USER');
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
