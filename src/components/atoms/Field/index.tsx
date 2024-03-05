import React from 'react';
import {TextInput} from 'react-native';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: '#F63A6E',
        paddingHorizontal: 10,
        width: '73%',
        backgroundColor: 'rgb(220,220, 220)',
        marginVertical: 10,
        height: 40,
      }}
      placeholderTextColor={'#e69ab0'}></TextInput>
  );
};

export default Field;
