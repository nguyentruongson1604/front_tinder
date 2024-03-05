import {Text, useTheme, View} from 'native-base';
// import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';

export interface IChip {
  icon?: React.ReactNode;
  content: string;
  isHighlight?: boolean;
  onPress?: () => void;
}

export const Chip: React.FC<IChip> = ({
  icon,
  content,
  isHighlight,
  onPress,
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  //   const [isHighlight, setIsHighLight] = useState<boolean>(false);
  return (
    <Pressable onPress={onPress}>
      <View
        style={
          isHighlight
            ? [styles.wrapper, {borderColor: '#F63A6E', borderWidth: 1}]
            : styles.wrapper
        }>
        {icon}
        <Text
          style={
            isHighlight
              ? {...styles.text, color: 'black', fontSize: 16}
              : {...styles.text, color: '#746d6d', fontSize: 16}
          }>
          {content}
        </Text>
      </View>
    </Pressable>
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
