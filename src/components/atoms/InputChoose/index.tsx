/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Text, useTheme, View} from 'native-base';
// import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';

export interface IInput {
  leftChildren?: any;
  rightChildren?: any;
  onPress?: () => void;
  borderTop?: boolean;
  borderBottom?: boolean;
  height?: any;
  marginLeft?: any;
  backgroundColor?: string;
}

export const InputChoose: React.FC<IInput> = ({
  leftChildren,
  rightChildren,
  onPress,
  borderTop = true,
  borderBottom = true,
  height = 55,
  marginLeft = 15,
  backgroundColor,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: height,
          alignItems: 'center',
          marginLeft: marginLeft,
          borderTopColor: borderTop ? '#e0dbdb' : '',
          borderTopWidth: borderTop ? 1 : 0,
          borderBottomColor: borderBottom ? '#e0dbdb' : '',
          borderBottomWidth: borderBottom ? 0.5 : 0,
          backgroundColor: backgroundColor ? backgroundColor : 'white',
        }}>
        <View style={{flexDirection: 'row'}}>
          {/* <MaterialIcons name="pets" style={{fontSize: 22, color: '#948d8d'}} />
          <Text style={{fontSize: 16, marginLeft: 8}}>Thú cưng</Text> */}
          {leftChildren}
        </View>
        <View
          style={[
            {flexDirection: 'row'},
            {width: '50%', justifyContent: 'flex-end', alignItems: 'center'},
          ]}>
          {/* <Text style={{fontSize: 16, marginRight: 3}}>Chọn</Text>
          <Entypo
            name="chevron-small-right"
            style={{fontSize: 22, color: '#948d8d'}}
          /> */}
          {rightChildren}
        </View>
      </View>
    </Pressable>
  );
};
