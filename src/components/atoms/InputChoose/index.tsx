import {Text, useTheme, View} from 'native-base';
// import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export interface IInput {
  leftChildren?: any;
  rightChildren?: any;
  onPress?: () => void;
  borderTop?: boolean;
  borderBottom?: boolean;
  height?: any;
  marginLeft?: any;
}

export const InputChoose: React.FC<IInput> = ({
  leftChildren,
  rightChildren,
  onPress,
  borderTop = true,
  borderBottom = true,
  height = 55,
  marginLeft = 15,
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
          borderTopColor: borderBottom ? '#e0dbdb' : '',
          borderTopWidth: borderBottom ? 1 : 0,
          borderBottomColor: borderTop ? '#e0dbdb' : '',
          borderBottomWidth: borderTop ? 1 : 0,
        }}>
        <View style={{flexDirection: 'row'}}>
          {/* <MaterialIcons name="pets" style={{fontSize: 22, color: '#948d8d'}} />
          <Text style={{fontSize: 16, marginLeft: 8}}>Thú cưng</Text> */}
          {leftChildren}
        </View>
        <View style={{flexDirection: 'row'}}>
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
