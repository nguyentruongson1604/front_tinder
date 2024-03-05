import {Text, useTheme, View} from 'native-base';
// import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';

export interface IButton {
  backgroundColor?: string;
  borderColor?: string;
  w?: string | number;
  h?: string | number;
  color: string;
  fontSize?: number | string;
  title?: string;
  onPress?: () => void;
  lineHeigth?: number;
}

export const Button: React.FC<IButton> = ({
  backgroundColor,
  borderColor,
  w,
  h,
  color,
  fontSize,
  onPress,
  title,
  lineHeigth,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor: backgroundColor,
          borderWidth: 2,
          borderColor: borderColor,
          borderRadius: 100,
          width: w,
          height: h,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: color,
            fontSize: fontSize,
            lineHeight: lineHeigth,
          }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
