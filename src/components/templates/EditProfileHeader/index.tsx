/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {View} from 'native-base';
import {useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useProfileStore} from '../../../store';
import {observer} from 'mobx-react-lite';

export const EditProfileHeader = observer(() => {
  const naviagation = useNavigation();
  const [editPhoto, setEditPhoto] = useState<boolean>(true);
  const profileStore = useProfileStore();
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
            width: '50%',
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
            Thêm ảnh
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setEditPhoto(false);
            naviagation.navigate('EditHobby');
          }}
          style={{
            width: '50%',
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
            Thêm sở thích
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
