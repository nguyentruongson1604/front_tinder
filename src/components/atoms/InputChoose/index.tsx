import {Text, useTheme, View} from 'native-base';
// import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export interface IInput {
  icon?: any;
  leftTitle?: any;
  rightTitle?: any;
  onPress?: () => void;
  borderTop?: boolean;
  borderBottom?: boolean;
}

export const InputChoose: React.FC<IInput> = ({
  icon,
  leftTitle,
  rightTitle,
  onPress,
  borderTop,
  borderBottom,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 55,
          alignItems: 'center',
          marginLeft: 15,
          borderTopColor: '#e0dbdb',
          borderTopWidth: 1,
          borderBottomColor: '#e0dbdb',
          borderBottomWidth: 1,
        }}>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons name="pets" style={{fontSize: 22, color: '#948d8d'}} />
          <Text style={{fontSize: 16, marginLeft: 8}}>Thú cưng</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16, marginRight: 3}}>Chọn</Text>
          <Entypo
            name="chevron-small-right"
            style={{fontSize: 22, color: '#948d8d'}}
          />
        </View>
      </View>
    </Pressable>
  );
};
