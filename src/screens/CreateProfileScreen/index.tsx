/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Pressable, Text, View} from 'react-native';

const ITab;
export const CreateProfileScreen = observer(() => {
  const naviagation = useNavigation();
  const [editPhoto, setEditPhoto] = useState<boolean>(true);
  return (
    <View>
      <View style={styles.fixedHeader}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '20%',
            }}
          />
          <View style={{width: '60%', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              Sửa thông tin
            </Text>
          </View>

          <Pressable
            style={{
              width: '20%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
            onPress={() => {
              profileStore.updateMyProfile(profileStore.dataUpdate);
            }}>
            <Text style={{fontWeight: '600'}}>Xong</Text>
          </Pressable>
        </View>
      </View>
      <View style={{flexDirection: 'row', paddingVertical: 8}}>
        <Pressable
          onPress={() => {
            setEditPhoto(true);
            naviagation.navigate('EditPicture');
          }}
          style={{
            width: '33.33%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 2,
            borderRightColor: '#5e5d5d46',
          }}>
          <Text
            style={{
              fontWeight: editPhoto ? '800' : '700',
              fontSize: 20,
              color: editPhoto ? '#F63A6E' : '#4d4a4bbf',
            }}>
            Ảnh
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setEditPhoto(false);
            naviagation.navigate('EditHobby');
          }}
          style={{
            width: '33.33%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 2,
            borderRightColor: '#5e5d5d46',
          }}>
          <Text
            style={{
              fontWeight: editPhoto ? '700' : '800',
              fontSize: 20,
              color: editPhoto ? '#4d4a4bbf' : '#F63A6E',
            }}>
            Sở thích
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setEditPhoto(false);
            naviagation.navigate('EditHobby');
          }}
          style={{
            width: '33.33%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: editPhoto ? '700' : '800',
              fontSize: 20,
              color: editPhoto ? '#4d4a4bbf' : '#F63A6E',
            }}>
            Tìm kiếm
          </Text>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  fixedHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  fixedHeaderText: {
    color: 'black',
    fontSize: 20,
  },
});
