import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from '../../components/atoms/ButtonCustom';

const MatchScreen = () => {
  return (
    <View style={styles.wrap}>
      <LinearGradient style={{flex: 1}} colors={['#ebcfd7', '#d5b9c1']}>
        <Image
          source={require('../../assets/images/matchgif.gif')}
          style={styles.matchPic}
        />

        <View
          style={{
            width: '100%',
            // backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={styles.user}>
            <Image
              source={{
                uri: 'https://assets.vogue.in/photos/640592409d03d0d41504f3a0/master/pass/Face%20taping%20.jpg',
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.user}>
            <Image
              source={{
                uri: 'https://assets.vogue.in/photos/640592409d03d0d41504f3a0/master/pass/Face%20taping%20.jpg',
              }}
              style={styles.image}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{marginTop: 50, marginBottom: 20}}>
            <Button
              backgroundColor="transparent"
              borderColor="#F63A6E"
              w={240}
              h={45}
              color="white"
              fontSize={23}
              title="Tiếp tục quẹt"
              // lineHeigth={43}
            />
          </View>
          <Button
            backgroundColor="#F63A6E"
            borderColor="#F63A6E"
            w={240}
            h={45}
            color="white"
            fontSize={23}
            title="Gửi tin nhắn"
            // lineHeigth={45}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flex: 1,
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
  matchPic: {
    width: '100%',
    // paddingBottom: -90,
    height: 300,
    // backgroundColor: 'green',
  },
  user: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 80,

    borderWidth: 2,
    padding: 3,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
});

export default MatchScreen;
