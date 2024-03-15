import React from 'react';
import {View, ImageBackground, Dimensions} from 'react-native';

const Background = ({children}) => {
  return (
    <View style={{height: Dimensions.get('window').height}}>
      <ImageBackground
        source={{
          uri: 'https://static1.squarespace.com/static/5e4ea426aa4ba303990c4914/5e7e1afa0313727501cb0267/5e7e1b390313727501cb1b40/1585323244180/?format=1500w',
        }}
        style={{height: '100%'}}
      />
      <View style={{position: 'absolute', width: '100%'}}>{children}</View>
    </View>
  );
};

export default Background;
