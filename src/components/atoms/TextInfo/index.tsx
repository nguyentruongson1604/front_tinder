/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';

export interface ITextInfo {
  title?: string;
  icon?: any;
  content?: string;
  borderTop?: boolean;
  borderBottom?: boolean;
}

export const TextInfo: React.FC<ITextInfo> = ({
  title,
  icon,
  content,
  borderTop,
  borderBottom,
}) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        borderTopWidth: borderTop ? 1 : 0,
        borderTopColor: borderTop ? '#e0dbdb' : '',
        borderBottomWidth: borderBottom ? 1 : 0,
        borderBottomColor: borderBottom ? '#e0dbdb' : '',
        marginBottom: 8,
      }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: '#4b4848',
          marginBottom: 8,
        }}>
        {title}
      </Text>
      <View style={{flexDirection: 'row', marginVertical: 0}}>
        {icon}
        <Text
          style={{
            fontSize: 16,
            marginLeft: 8,
            color: '#4b4848',
          }}>
          {content}
        </Text>
      </View>
    </View>
  );
};
