/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Background from '../../components/atoms/Background';
import Btn from '../../components/atoms/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Controller, useForm} from 'react-hook-form';
import {useProfileStore, useUserStore} from '../../store';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';

const LoginScreen = observer(() => {
  const userStore = useUserStore();
  const profileStore = useProfileStore();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    const res = await userStore.userLogin({...data});

    if (res.data.status == 'success') {
      await profileStore.checkExistPofile();
    } else {
      setValue('email', '');
      setValue('password', '');
      res.data.message.includes('email')
        ? setError('email', {
            type: 'manual',
            message: res.data.message,
          })
        : setError('password', {
            type: 'manual',
            message: res.data.message,
          });
    }
  };

  return (
    <Background>
      <View style={{alignItems: 'center', width: '100%'}}>
        <Text
          style={{
            color: 'white',
            fontSize: 60,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          HiMatch
        </Text>
        <FontAwesome
          name="heart"
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            color: 'white',
            marginBottom: 40,
          }}
        />

        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: '100%',
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              fontWeight: 'bold',
              marginTop: 20,
              marginBottom: 30,
            }}>
            Đăng nhập
          </Text>
          <View style={{marginVertical: 10, width: '73%'}}>
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
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Email"
                  keyboardType="email-address"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          <View style={{marginVertical: 10, width: '73%'}}>
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'Mật khẩu là bắt buộc'},
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải dài ít nhất 6 ký tự',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Mật khẩu"
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
          <View style={{width: '65%', alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Resetpass');
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                  fontSize: 15,
                }}>
                Quên mật khẩu
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              marginTop: 35,
            }}
          />
          <Btn
            textColor="white"
            bgColor={'#F63A6E'}
            btnLabel="Đăng nhập"
            Press={handleSubmit(onSubmit)}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'grey'}}>
              Bạn chưa có tài khoản?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text
                style={{
                  color: '#F63A6E',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderRadius: 100,
    color: 'black',
    paddingHorizontal: 15,
    fontSize: 20,
    backgroundColor: '#3836372f',
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
  },
  errorText: {
    color: 'red',
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 3,
  },
});
export default LoginScreen;
