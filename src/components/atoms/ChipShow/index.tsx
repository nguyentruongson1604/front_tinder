/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Text, useTheme, View} from 'native-base';
// import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';

export interface IChipShow {
  icon?: React.ReactNode;
  content: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  fontSize?: number;
  lineHeight?: number;
  backgroundColor?: string;
  color?: string;
}

export const Chip: React.FC<IChipShow> = ({
  icon,
  content,
  paddingVertical,
  paddingHorizontal,
  marginRight,
  marginBottom,
  marginLeft,
  fontSize,
  lineHeight,
  backgroundColor,
  color,
}) => {
  //   const [isHighlight, setIsHighLight] = useState<boolean>(false);
  return (
    <View
      style={{
        paddingVertical: paddingVertical ? paddingVertical : 6,
        paddingHorizontal: paddingHorizontal ? paddingHorizontal : 13,
        backgroundColor: backgroundColor ? backgroundColor : '#746d6d1e',
        borderWidth: 0.5,
        borderColor: 'white',
        alignSelf: 'flex-start',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //   shadowColor: '#948d8d',
        //   shadowOffset: {
        //     width: 0,
        //     height: 1,
        //   },
        //   shadowOpacity: 0.25,
        //   shadowRadius: 3.84,

        //   elevation: 5,
        marginRight: marginRight ? marginRight : 10,
        marginBottom: marginBottom ? marginBottom : 15,
        marginLeft: marginLeft ? marginLeft : 0,
      }}>
      {icon}
      <Text
        style={{
          fontSize: fontSize ? fontSize : 15,
          lineHeight: lineHeight ? lineHeight : 18,
          color: color ? color : 'black',
        }}>
        {content}
      </Text>
    </View>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    wrapper: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      borderWidth: 0.5,
      borderColor: '#746d6d',
      alignSelf: 'flex-start',
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      //   shadowColor: '#948d8d',
      //   shadowOffset: {
      //     width: 0,
      //     height: 1,
      //   },
      //   shadowOpacity: 0.25,
      //   shadowRadius: 3.84,

      //   elevation: 5,
      marginRight: 10,
      marginBottom: 10,
    },
    text: {
      // fontFamily: theme.fontConfig.primary[400],
      fontSize: 12,
      lineHeight: 15,
    },
  });
