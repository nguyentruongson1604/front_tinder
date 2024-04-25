/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Pressable,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ImgSelect from '../../components/atoms/ImgSlider';
import WrapcardInfo from '../../components/atoms/WrapCardInfo';
import {InputChoose} from '../../components/atoms/InputChoose';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInfo} from '../../components/atoms/TextInfo';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Chip} from '../../components/atoms/ChipShow';

const LeftLocation = ({distance}) => {
  const ceilDis = Math.ceil(distance / 1000);
  return (
    <>
      <EvilIcons name="location" style={{fontSize: 22, color: '#948d8d'}} />
      <Text style={{fontSize: 16, marginLeft: 8}}>cách xa {ceilDis} km</Text>
    </>
  );
};

export const hobbyInfos = {
  zodiac: {
    icon: (
      <FontAwesome name="moon-o" style={{fontSize: 18, color: '#948d8d'}} />
    ),
    title: 'Cung hoàng đạo',
  },
  education: {
    icon: (
      <Ionicons
        name="school-outline"
        style={{fontSize: 18, color: '#948d8d'}}
      />
    ),
    title: 'Trình độ học vấn',
  },

  things: {
    icon: (
      <MaterialCommunityIcons
        name="heart-cog-outline"
        style={{fontSize: 18, color: '#948d8d'}}
      />
    ),
    title: 'Ngôn ngữ tình yêu',
  },
};
const InfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {user} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.fixedHeader}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', marginRight: 8}}>
              {user?.user?.firstName}
            </Text>
            <Text style={{fontSize: 30}}>{user?.age}</Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('Switch');
            }}>
            <FontAwesome6
              name="circle-down"
              style={{fontSize: 30, color: '#F63A6E'}}
            />
          </Pressable>
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
              <Foundation
                name="magnifying-glass"
                style={{fontSize: 22, color: '#948d8d'}}
              />
            }
            title={'Đang tìm kiếm'}>
            <Text style={{fontSize: 16}}>{user?.title}</Text>
          </WrapcardInfo>

          <WrapcardInfo
            icon={
              <MaterialCommunityIcons
                name="comment-question"
                style={{fontSize: 22, color: '#948d8d'}}
              />
            }
            title={'Giới thiệu bản thân'}>
            <Text style={{fontSize: 16}}>{user?.description}</Text>
          </WrapcardInfo>

          <WrapcardInfo
            icon={
              <MaterialCommunityIcons
                name="account-box"
                style={{fontSize: 22, color: '#948d8d'}}
              />
            }
            title={'Thông tin chính'}>
            <InputChoose
              leftChildren={<LeftLocation distance={user?.distance} />}
              marginLeft={0}
            />
            <InputChoose
              leftChildren={
                <>
                  <SimpleLineIcons
                    name="home"
                    style={{fontSize: 16, marginLeft: 6, color: '#948d8d'}}
                  />
                  <Text style={{fontSize: 16, marginLeft: 8}}>
                    {user?.adress}
                  </Text>
                </>
              }
              marginLeft={0}
              borderTop={false}
            />
          </WrapcardInfo>

          <WrapcardInfo
            icon={
              <MaterialCommunityIcons
                name="more"
                style={{fontSize: 22, color: '#948d8d'}}
              />
            }
            title={'Thông cơ bản'}>
            {user?.hobby?.map(hobby => {
              const hobbyInfo = hobbyInfos[hobby?.type];
              if (hobbyInfo) {
                return (
                  <TextInfo
                    key={hobby?.id}
                    icon={hobbyInfo.icon}
                    title={hobbyInfo.title}
                    content={hobby?.name}
                    borderBottom
                  />
                );
              } else {
                return null;
              }
            })}

            {/* <TextInfo
              icon={
                <Ionicons
                  name="school-outline"
                  style={{fontSize: 18, color: '#948d8d'}}
                />
              }
              title={'Trình độ học vấn'}
              content={'đại học'}
              borderBottom
            />
            <TextInfo
              icon={
                <Ionicons
                  name="chatbox-ellipses-outline"
                  style={{fontSize: 18, color: '#948d8d'}}
                />
              }
              title={'Phong cách giao tiếp'}
              content={'đại học'}
              borderBottom
            />
            <TextInfo
              icon={
                <MaterialCommunityIcons
                  name="heart-cog-outline"
                  style={{fontSize: 18, color: '#948d8d'}}
                />
              }
              title={'Ngôn ngữ tình yêu'}
              content={'đại học'}
              borderBottom
            /> */}
          </WrapcardInfo>

          <WrapcardInfo
            icon={
              <FontAwesome6
                name="icons"
                style={{fontSize: 20, color: '#948d8d'}}
              />
            }
            title={'Sở thích'}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {user?.hobby?.map(hobby => {
                if (!hobbyInfos[hobby?.type]) {
                  return <Chip content={hobby?.name} />;
                } else {
                  return null;
                }
              })}
            </View>
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
