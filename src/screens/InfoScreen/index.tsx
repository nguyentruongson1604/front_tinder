import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ImgSelect from '../../components/atoms/ImgSlider';
import WrapcardInfo from '../../components/atoms/WrapCardInfo';
import {InputChoose} from '../../components/atoms/InputChoose';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInfo} from '../../components/atoms/TextInfo';

const Left = () => {
  return (
    <>
      <MaterialIcons name="pets" style={{fontSize: 22, color: '#948d8d'}} />
      <Text style={{fontSize: 16, marginLeft: 8}}>Thú cưng</Text>
    </>
  );
};

const InfoScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.fixedHeader}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', marginRight: 8}}>
              Son
            </Text>
            <Text style={{fontSize: 30}}>21</Text>
          </View>
          <FontAwesome6
            name="circle-down"
            style={{fontSize: 30, color: '#F63A6E'}}
          />
        </View>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              height:
                Dimensions.get('window').height -
                (Dimensions.get('window').height * 40) / 100,
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <ImgSelect width={Dimensions.get('window').width} />
          </View>
          <WrapcardInfo
            icon={
              <MaterialCommunityIcons
                name="account-box"
                style={{fontSize: 22, color: '#948d8d'}}
              />
            }
            title={'Thông tin chính'}>
            <TextInfo
              icon={
                <FontAwesome
                  name="moon-o"
                  style={{fontSize: 18, color: '#948d8d'}}
                />
              }
              title={'Cung hoàng đạo'}
              content={'Xử nữ'}
              borderBottom
            />
            <TextInfo
              icon={
                <FontAwesome
                  name="moon-o"
                  style={{fontSize: 18, color: '#948d8d'}}
                />
              }
              title={'Cung hoàng đạo'}
              content={'Xử nữ'}
              borderBottom
            />
          </WrapcardInfo>

          <WrapcardInfo
            icon={
              <MaterialCommunityIcons
                name="account-box"
                style={{fontSize: 22, color: '#948d8d'}}
              />
            }
            title={'Thông tin cơ bản'}>
            <InputChoose leftChildren={<Left />} />
          </WrapcardInfo>

          <WrapcardInfo
            icon={
              <MaterialCommunityIcons
                name="account-box"
                style={{fontSize: 22, color: '#948d8d'}}
              />
            }
            title={'Phong cách sống'}>
            <InputChoose leftChildren={<Left />} />
          </WrapcardInfo>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedHeader: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  fixedHeaderText: {
    color: 'black',
    fontSize: 20,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#a1a6d649',
    // backgroundColor: 'red',
  },
  item: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default InfoScreen;
