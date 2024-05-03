/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from '../../components/atoms/ButtonCustom';
import {observer} from 'mobx-react-lite';
import {useProfileStore} from '../../store';

interface IMatchScreen {
  open: boolean;
  handlePressMessage: any;
  handlePressHome: any;
  data: any;
}
const MatchScreen: React.FC<IMatchScreen> = observer(
  ({open, handlePressMessage, handlePressHome, data}) => {
    const profileStore = useProfileStore();

    return (
      <Modal animationType="fade" transparent={true} visible={open}>
        <View style={styles.wrap}>
          <LinearGradient
            style={{flex: 1, paddingTop: 30}}
            colors={['#ebcfd7', '#d5b9c1']}>
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
                    uri: profileStore?.photos?.imageProfileUrl[0] || '',
                  }}
                  style={styles.image}
                />
              </View>
              <View style={styles.user}>
                <Image
                  source={{
                    uri: data?.photos?.imageProfileUrl[0] || '',
                  }}
                  style={styles.image}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 60,
              }}>
              <Pressable style={{marginBottom: 20}} onPress={handlePressHome}>
                <LinearGradient
                  colors={['#F63A6E', '#e67091', '#eda084']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    height: 50,
                    width: 250,
                    borderRadius: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 46,
                      width: 246,
                      backgroundColor: '#d5b9c1',
                      borderRadius: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white', fontSize: 20}}>
                      Tiếp tục quẹt
                    </Text>
                  </View>
                </LinearGradient>
              </Pressable>
              <Pressable onPress={handlePressMessage}>
                <LinearGradient
                  colors={['#F63A6E', '#e67091', '#eda084']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    height: 50,
                    width: 250,
                    borderRadius: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: 20}}>
                    Gửi tin nhắn
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    );
  },
);

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
