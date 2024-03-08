import React, {useCallback, useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import ImgSelect from '../atoms/ImgSlider';
const WrapcardInfo = ({children}) => {
  return (
    <View
      style={[
        {
          backgroundColor: 'white',
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 30,
          width: '100%',
          marginBottom: 10,
        },
      ]}>
      {children}
    </View>
  );
};

export default WrapcardInfo;
