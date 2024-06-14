/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useNavigation} from '@react-navigation/native';
import {Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

export const RunOutPeople = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', paddingTop: 30}}>
      <FastImage
        source={require('../../assets/images/location.gif')}
        style={{
          width: '70%',
          // paddingBottom: -90,
          height: 300,
        }}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 15,
          marginBottom: 5,
          color: '#F76C6B',
        }}>
        Bạn đã hết đối tượng để tương hợp
      </Text>
      <View style={{width: '80%', alignItems: 'center', marginBottom: 30}}>
        <Text style={{textAlign: 'center'}}>
          Hãy mở rộng khoảng cách của bạn để có thể gặp gỡ nhiều người hơn
        </Text>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate('Setting');
        }}>
        <LinearGradient
          colors={['#F63A6E', '#e67091', '#eda084']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            height: 50,
            width: 250,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            Đi đến cài đặt
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};
