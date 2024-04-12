/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, Text, TextInput} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {InputChoose} from '../../components/atoms/InputChoose';
import Entypo from 'react-native-vector-icons/Entypo';
import MultiSliderSelect from '../../components/atoms/MultiSliderSelect';
import SingleSlider from '../../components/atoms/SingleSlider';
import {observer} from 'mobx-react-lite';

export interface ISettingChoose {
  title: string;
  isPress?: boolean;
  content?: string;
  onPress?: any;
  isPassWord?: boolean;
  isAdress?: boolean;
}
const SettingTitle: React.FC<{title: string}> = ({title}) => {
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

const HobbyChoose: React.FC<ISettingChoose> = ({
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

          <View
            style={{
              width: '20%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: '600'}}>Xong</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#aaaae13b', flexGrow: 1}}>
        <View>
          <SettingTitle title="Cài đặt tài khoản" />
          <HobbyChoose title="Họ" content="Nguyễn" />
          <HobbyChoose title="Tên" content="Sơn" />
          <HobbyChoose title="Email" content="Son@mgail.com" />
          <HobbyChoose title="Mật khẩu" content="123456" isPress isPassWord />
        </View>
        <View>
          <SettingTitle title="Cài đặt tìm kiếm" />
          <View>
            <HobbyChoose
              title="Địa điểm"
              content="Dia diem hien tai cua toi: Thanh pho Ha Noi Thanh pho Ha Noi Thanh pho Ha Noi"
              isAdress
              isPress
            />
            <MultiSliderSelect />
            <HobbyChoose title="Hiển thị cho tôi" content="Nữ" isPress />
            <SingleSlider />
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
            }}>
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