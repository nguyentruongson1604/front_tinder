/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Background from '../../components/atoms/Background';
import Btn from '../../components/atoms/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Controller, useForm} from 'react-hook-form';
import {useUserStore} from '../../store';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const userStore = useUserStore();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: any) => {
    const res = await userStore.userRegister({...data});
    if (res.status == 'success') {
    } else {
      setValue('email', '');
      setValue('password', '');
      setValue('confirmPassword', '');
      setError('email', {
        type: 'manual',
        message: 'Email đã tồn tại',
      });
    }
  };

  // Hàm kiểm tra mật khẩu và xác nhận mật khẩu có giống nhau không
  const validatePasswordMatch = (confirmPassword: any) => {
    const password = watch('password');
    return password === confirmPassword || 'Mật khẩu không khớp';
  };
  console.log('resgister',userStore.userAccess);
  
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
          style={{fontWeight: 'bold', fontSize: 22, color: 'white'}}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: '100%',
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <View style={{marginVertical: 10, width: '73%'}}>
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'Họ là bắt buộc'},
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Họ"
                />
              )}
              name="firstName"
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName.message}</Text>
            )}
          </View>

          <View style={{marginVertical: 10, width: '73%'}}>
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'Tên là bắt buộc'},
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Tên"
                />
              )}
              name="lastName"
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName.message}</Text>
            )}
          </View>

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

          <View style={{marginVertical: 10, width: '73%'}}>
            <Controller
              control={control}
              rules={{
                validate: validatePasswordMatch,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Xác nhận mật khẩu"
                  secureTextEntry
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              marginTop: 35,
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{color: '#F63A6E', fontWeight: 'bold', fontSize: 16}}>
              Terms & Conditions
            </Text>
          </View> */}

          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '78%',
              paddingRight: 16,
              marginBottom: 10,
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>and </Text>
            <Text style={{color: '#F63A6E', fontWeight: 'bold', fontSize: 16}}>
              Privacy Policy
            </Text>
          </View> */}
          <Btn
            textColor="white"
            bgColor={'#F63A6E'}
            btnLabel="Đăng ký"
            Press={handleSubmit(onSubmit)}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'grey'}}>
              Already have an account ?{' '}
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
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};
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
export default RegisterScreen;
