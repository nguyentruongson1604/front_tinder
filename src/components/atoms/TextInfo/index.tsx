import {Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: '#4b4848',
          marginBottom: 5,
        }}>
        {title}
      </Text>
      <View style={{flexDirection: 'row'}}>
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
