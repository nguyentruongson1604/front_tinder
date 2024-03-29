/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Actionsheet, Button, useDisclose} from 'native-base';
import {Pressable, Text} from 'react-native';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Chip} from '../ChipCustom';

const ActionsheetCustom = () => {
  const [isSelect, setisSelect] = useState<string>('');
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <>
      <Button onPress={onOpen}></Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <View style={{paddingHorizontal: 10, width: '100%'}}>
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
              <Pressable onPress={onClose}>
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
                Thêm thông tin bản thân để mọi ngừoi hiểu rõ hơn về con ngừoi
                tuyệt vời của bạn
              </Text>
            </View>

            {/* bottom */}
            <View style={{paddingVertical: 25, flexDirection: 'row'}}>
              <Ionicons
                name="school-outline"
                style={{fontSize: 22, marginRight: 10, color: '#F63A6E'}}
              />
              <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
                Trình độ học vấn của bạn?
              </Text>
            </View>
            <View
              style={{
                width: '80%',
                flexWrap: 'wrap',
                flexDirection: 'row',
                paddingBottom: 25,
              }}>
              <Chip
                content="dang hoc dai hoc"
                isHighlight={isSelect === 'dang hoc dai hoc'}
                onPress={() => {
                  setisSelect(pre => {
                    return pre === 'dang hoc dai hoc' ? '' : 'dang hoc dai hoc';
                  });
                }}
              />
              <Chip
                content="cu nhan"
                isHighlight={isSelect === 'cu nhan'}
                onPress={() => {
                  setisSelect('cu nhan');
                }}
              />
              <Chip content="tien si" />
              <Chip content="thac si" />
              <Chip content="truong day nghe" />
            </View>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default ActionsheetCustom;
