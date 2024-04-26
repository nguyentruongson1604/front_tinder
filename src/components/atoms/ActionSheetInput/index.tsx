/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Actionsheet} from 'native-base';
import {Platform, Pressable, ScrollView, Text, TextInput} from 'react-native';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Chip} from '../ChipPress';
import {useProfileStore} from '../../../store';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export interface IActionsheetInput {
  isOpen: any;
  onOpen: any;
  onClose: any;
  data: any;
  donePress: any;
}
export const ActionSheetInput: React.FC<IActionsheetInput> = ({
  isOpen,
  onOpen,
  onClose,
  data,
  donePress,
}) => {
  const [awareKeyboard, setAwareKeyBoard] = useState<boolean>(false);
  const [address, setAddress] = useState<string>(data || '');

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <View
          style={{
            paddingHorizontal: 10,
            width: '100%',
            paddingBottom: awareKeyboard ? 300 : 10,
          }}>
          <KeyboardAwareScrollView
            style={{width: '100%'}}
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled">
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
                  donePress(address);
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
                Thông tin thêm về tôi
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 55,
                borderBlockColor: '#3c3939',
                borderBottomWidth: 0.7,
              }}>
              <Text style={{color: '#3c3939', fontSize: 16}}>
                Thêm thông tin bản thân để mọi người hiểu rõ hơn về con người
                tuyệt vời của bạn
              </Text>
            </View>
            <View style={{paddingVertical: 25, flexDirection: 'row'}}>
              <Ionicons
                name="location"
                style={{fontSize: 22, marginRight: 10, color: '#F63A6E'}}
              />
              <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
                Địa chỉ của bạn?
              </Text>
            </View>
            <LinearGradient
              colors={['#F63A6E', '#e67091', '#eda084']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                minHeight: 60,
                maxHeight: 120,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: 2,
              }}>
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={500}
                onFocus={() => {
                  setAwareKeyBoard(true);
                }}
                onBlur={() => {
                  setAwareKeyBoard(false);
                }}
                onChangeText={text => {
                  setAddress(text);
                  // profileStore.setDataUpdate('title', text);
                }}
                defaultValue={address}
                style={{
                  padding: 15,
                  backgroundColor: 'white',
                  minHeight: 56,
                  fontSize: 16,
                  width: '100%',
                  borderRadius: 18,
                  //   height: '100%',
                }}
              />
            </LinearGradient>
          </KeyboardAwareScrollView>
        </View>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
