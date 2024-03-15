import React, {useCallback, useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import ImgSelect from '../../atoms/ImgSlider';
const CardProfile = () => {
  return (
    <View style={[styles.card, {zIndex: 3}]}>
      {/* <ImageBackground
        source={{
          uri: 'https://assets.vogue.in/photos/640592409d03d0d41504f3a0/master/pass/Face%20taping%20.jpg',
        }}
        style={styles.image}>
        <View style={styles.wrapContent}>
          <Text style={styles.name}>Nguyen Truong Son</Text>
          <Text style={styles.bio}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </View>
      </ImageBackground> */}
      <ImgSelect />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    height: '85%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  bio: {
    color: 'white',
    fontSize: 18,
    lineHeight: 24,
  },
  wrapContent: {
    padding: 10,
  },
});
export default CardProfile;
