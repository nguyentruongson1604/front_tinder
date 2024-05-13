/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Image} from 'react-native';
import {Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '../../store';

export const ResetPassScreen = () => {
  const userStore = useUserStore();
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const navigation = useNavigation();
  const onSubmit = async (data: any) => {
    const res = await userStore.resetPasswordByEmail({emailReset: data.email});
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          height: '40%',
          justifyContent: 'flex-end',
        }}>
        <Image
          source={{
            uri: 'https://t4.ftcdn.net/jpg/04/20/32/53/360_F_420325313_0tgC68egfuhtzKf1OhVlZRHG6Dvv36Xt.jpg',
          }}
          style={{width: 250, height: 250}}
        />
      </View>
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            textAlign: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          Quên mật khẩu?
        </Text>
      </View>
      <View style={{paddingHorizontal: 40}}>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            justifyContent: 'center',
            fontStyle: 'italic',
            color: '#6d6a6a',
          }}>
          Hãy nhập địa chỉ Email mà bạn đăng ký, chúng tôi sẽ tạo 1 mật khẩu mới
          nằm trong hòm thư cho bạn
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <View
          style={{
            width: 320,
            height: 60,
            borderRadius: 5,
            flexDirection: 'row',
            borderColor: '#aba7a7',
            borderWidth: 1,
            padding: 8,
            alignItems: 'center',
          }}>
          <View
            style={{
              paddingRight: 8,
              marginRight: 10,
              borderRightColor: '#aba7a7',
              borderRightWidth: 1,
            }}>
            <MaterialCommunityIcons
              name="email-send-outline"
              style={{fontSize: 30, color: '#817e7e'}}
            />
          </View>
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'Email là bắt buộc'},
              pattern: {
                value: /^\S+@\S+$/,
                message: 'Email không hợp lệ',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{width: 250, height: '100%'}}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
                keyboardType="email-address"
              />
            )}
            name="email"
          />
        </View>
        {errors.email && (
          <Text
            style={{
              color: 'red',
              marginLeft: 15,
              marginBottom: 5,
              marginTop: 3,
            }}>
            {errors.email.message}
          </Text>
        )}
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: 25,
        }}>
        <Pressable onPress={handleSubmit(onSubmit)}>
          <LinearGradient
            colors={['#F63A6E', '#e67091', '#eda084']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              height: 50,
              width: 250,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              Gửi
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'grey'}}>
          Quay lại{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text
            style={{
              color: '#F63A6E',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
