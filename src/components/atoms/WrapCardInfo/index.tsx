import React from 'react';
import {Text, View} from 'react-native';

const WrapcardInfo = ({icon, title, children}) => {
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
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        {icon}
        <Text
          style={{
            fontSize: 16,
            marginLeft: 8,
            fontWeight: 'bold',
            color: '#4b4848',
            paddingTop: 2,
          }}>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
};

export default WrapcardInfo;
