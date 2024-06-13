/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, Text, TextInput} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {InputChoose} from '../../components/atoms/InputChoose';
import Entypo from 'react-native-vector-icons/Entypo';
import MultiSliderSelect from '../../components/atoms/MultiSliderSelect';
import SingleSlider from '../../components/atoms/SingleSlider';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {
  usePreferencesStore,
  useProfileStore,
  useSocket,
  useUserStore,
} from '../../store';
import {ModalCustom} from '../../components/atoms/Modal';
import {IUpdatePreferences} from '../../store/domain/PreferencesStore';
import {ActionSheetPassword} from '../../components/atoms/ActionSheetPassword';
import {useDisclose} from 'native-base';
import {convertGender} from '../EditHobbyScreen';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export interface ISettingChoose {
  title: string;
  isPress?: boolean;
  content?: string;
  onPress?: any;
  isPassWord?: boolean;
  isAdress?: boolean;
}
export const SettingTitle: React.FC<{title: string}> = ({title}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        marginLeft: 15,
      }}>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 17,
        }}>
        {title}
      </Text>
    </View>
  );
};

export const HobbyChoose: React.FC<ISettingChoose> = ({
  title,
  isPress = false,
  content,
  onPress,
  isPassWord = false,
  isAdress = false,
}) => {
  return (
    <>
      <InputChoose
        leftChildren={
          <View style={{marginLeft: 15, flexDirection: 'row'}}>
            <Text style={{fontSize: 16}}>{title}</Text>
          </View>
        }
        rightChildren={
          <>
            {isPassWord ? (
              <TextInput
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  marginRight: isPress ? 8 : 15,
                }}
                secureTextEntry={isPress ? true : false}
                value={content}
                editable={false}
              />
            ) : (
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  marginRight: isPress ? 8 : 15,
                }}>
                {content}
              </Text>
            )}

            {isPress ? (
              <View
                style={{
                  height: '100%',
                }}>
                <Entypo
                  name="chevron-small-right"
                  style={{
                    fontSize: 22,
                    marginRight: 15,
                    color: '#948d8d',
                  }}
                />
              </View>
            ) : null}
          </>
        }
        borderBottom
        borderTop={false}
        marginLeft={0}
        height={isAdress ? 'auto' : 50}
        onPress={isPress ? onPress : () => {}}
      />
    </>
  );
};

export const SettingScreen = observer(() => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const profileStore = useProfileStore();
  const userStore = useUserStore();
  const preferencesStore = usePreferencesStore();
  const socket = useSocket();
  const [distance, setDistance] = useState<number[]>(
    [profileStore.preferences.distance] || [100],
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState<string>(
    profileStore.preferences.gender || '',
  );
  const [minmaxAge, setMinMaxAge] = useState<number[]>(
    [
      profileStore.preferences.age.minAge,
      profileStore.preferences.age.maxAge,
    ] || [18, 100],
  );
  const handlePressPopup = (gender: string) => {
    setGender(gender);
    setModalVisible(false);
  };
  const handlePressDone = async (data: IUpdatePreferences) => {
    await preferencesStore.updatePreferences(data);
  };
  useEffect(() => {
    socket.on('getNotifyForSetting', res => {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Message',
        textBody: 'Bạn có tin nhắn mới',
        autoClose: 3000,
      });
    });

    return () => {
      socket.off('getNotifyForSetting');
    };
  }, [socket]);
  return (
    <View style={{flex: 1}}>
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
              Cài đặt
            </Text>
          </View>

          <Pressable
            onPress={async () => {
              console.log('ininin', {
                gender,
                age: {minAge: minmaxAge[0], maxAge: minmaxAge[1]},
                distance: distance[0],
              });

              await handlePressDone({
                gender,
                age: {minAge: minmaxAge[0], maxAge: minmaxAge[1]},
                distance: distance[0],
              });
            }}
            style={{
              width: '20%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: '600'}}>Xong</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#aaaae13b', flexGrow: 1}}>
        <View>
          <SettingTitle title="Cài đặt tài khoản" />
          <HobbyChoose title="Họ" content={userStore.infoUser?.lastName} />
          <HobbyChoose title="Tên" content={userStore.infoUser?.firstName} />
          <HobbyChoose title="Email" content={userStore.infoUser?.email} />
          <HobbyChoose
            title="Mật khẩu"
            content="123456"
            isPress
            isPassWord
            onPress={onOpen}
          />
        </View>
        <View>
          <SettingTitle title="Cài đặt tìm kiếm" />
          <View>
            <MultiSliderSelect value={minmaxAge} setValue={setMinMaxAge} />
            <HobbyChoose
              title="Hiển thị cho tôi"
              content={convertGender[gender]}
              isPress
              onPress={() => {
                setModalVisible(true);
              }}
            />
            <SingleSlider
              value={distance}
              setValue={setDistance}
              title="Khoảng cách ưu tiên"
              unit="km"
              start={0}
              end={100}
              // init={profileStore.age}
            />
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Pressable
            style={{
              height: 45,
              width: '100%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={userStore.logout}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Đăng xuất
            </Text>
          </Pressable>
          <Pressable
            style={{
              height: 45,
              width: '100%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Xoá tài khoản
            </Text>
          </Pressable>
        </View>
        <ModalCustom
          open={modalVisible}
          handlePress={handlePressPopup}
          title="Hiển thị cho tôi"
        />
        <ActionSheetPassword
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
      </ScrollView>
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
