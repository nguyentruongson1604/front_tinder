/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Actionsheet} from 'native-base';
import {Pressable, Text, TextInput} from 'react-native';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Controller, useForm} from 'react-hook-form';
import {useUserStore} from '../../../store';

export interface IActionsheetInput {
  isOpen: any;
  onOpen: any;
  onClose: any;
  data: any;
  donePress: any;
}

const PasswordInput = ({
  onBlur,
  onChange,
  value,
  placeholder,
  setAwareKeyBoard,
}) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <View
      style={{
        borderRadius: 10,
        paddingHorizontal: 15,
        borderColor: '#aeabac',
        borderWidth: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TextInput
        style={{
          borderRadius: 10,
          color: 'black',
          fontSize: 18,
          height: 48,
          width: '80%',
        }}
        onFocus={() => {
          setAwareKeyBoard(true);
        }}
        onBlur={() => {
          onBlur();
          setAwareKeyBoard(false);
        }}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        secureTextEntry={showPass ? false : true}
      />
      {showPass ? (
        <Pressable
          onPress={() => {
            setShowPass(false);
          }}>
          <Ionicons
            name="eye-outline"
            style={{
              fontSize: 28,
            }}
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            setShowPass(true);
          }}>
          <Ionicons
            name="eye-off-outline"
            style={{
              fontSize: 28,
            }}
          />
        </Pressable>
      )}
    </View>
  );
};
export const ActionSheetPassword: React.FC<IActionsheetInput> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      curPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const userStore = useUserStore();
  const [awareKeyboard, setAwareKeyBoard] = useState<boolean>(false);
  const validatePasswordMatch = (confirmNewPassword: any) => {
    const newPassword = watch('newPassword');
    return newPassword === confirmNewPassword || 'Mật khẩu không khớp';
  };
  const onSubmit = async (data: any) => {
    const res = await userStore.changePassword(
      data.curPassword,
      data.newPassword,
    );
    if (res) {
      setValue('curPassword', '');
      setValue('newPassword', '');
      setValue('confirmNewPassword', '');
      setError('curPassword', {
        type: 'manual',
        message: res.message,
      });
    } else {
      onClose();
      setValue('curPassword', '');
      setValue('newPassword', '');
      setValue('confirmNewPassword', '');
    }
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <KeyboardAwareScrollView
          style={{width: '100%'}}
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              paddingHorizontal: 10,
              width: '100%',
              paddingBottom: awareKeyboard ? 300 : 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: 20,
              }}>
              <Pressable onPress={onClose}>
                <AntDesign
                  name="close"
                  style={{fontWeight: 'bold', fontSize: 25, color: 'grey'}}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  onClose();
                }}>
                <Text style={{color: 'grey', fontSize: 16, fontWeight: 'bold'}}>
                  Xong
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                width: '100%',
                marginBottom: 15,
              }}>
              <Text style={{fontSize: 34, fontWeight: 'bold'}}>
                Đổi mật khẩu
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 55,
                borderBlockColor: '#3c3939',
                borderBottomWidth: 0.7,
                marginBottom: 15,
              }}>
              <Text style={{color: '#3c3939', fontSize: 16}}>
                Mật khẩu của bạn phải có tối thiểu 6 kí tự, có thể là chữ số,
                chữ cái và các kí tự đặc biệt
              </Text>
            </View>

            <View style={{marginVertical: 10, width: '100%'}}>
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
                  <PasswordInput
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    placeholder={'Nhập mật khẩu hiện tại'}
                    setAwareKeyBoard={setAwareKeyBoard}
                  />
                )}
                name="curPassword"
              />
              {errors.curPassword && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: 15,
                    marginBottom: 5,
                    marginTop: 3,
                  }}>
                  {errors.curPassword.message}
                </Text>
              )}
            </View>
            <View style={{marginVertical: 10, width: '100%'}}>
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
                  <PasswordInput
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    placeholder={'Mật khẩu mới'}
                    setAwareKeyBoard={setAwareKeyBoard}
                  />
                )}
                name="newPassword"
              />
              {errors.newPassword && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: 15,
                    marginBottom: 5,
                    marginTop: 3,
                  }}>
                  {errors.newPassword.message}
                </Text>
              )}
            </View>
            <View style={{marginVertical: 10, width: '100%'}}>
              <Controller
                control={control}
                rules={{
                  required: {value: true, message: 'Mật khẩu là bắt buộc'},
                  validate: validatePasswordMatch,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <PasswordInput
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    placeholder={'Nhập lại mật khẩu mới'}
                    setAwareKeyBoard={setAwareKeyBoard}
                  />
                )}
                name="confirmNewPassword"
              />
              {errors.confirmNewPassword && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: 15,
                    marginBottom: 5,
                    marginTop: 3,
                  }}>
                  {errors.confirmNewPassword.message}
                </Text>
              )}
            </View>
            <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
              <Pressable onPress={handleSubmit(onSubmit)}>
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
                  <Text
                    style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                    Đổi mật khẩu
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
