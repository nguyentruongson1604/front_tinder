/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Actionsheet} from 'native-base';
import {Pressable, Text} from 'react-native';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Chip} from '../ChipPress';
import {useProfileStore} from '../../../store';

export interface IActionsheetCustom {
  isOpen: any;
  onOpen: any;
  onClose: any;
  data: any;
  actionSheetTitle: any;
  donePress: any;
  listHobby: any;
}
const ActionsheetCustom: React.FC<IActionsheetCustom> = ({
  isOpen,
  onOpen,
  onClose,
  data,
  actionSheetTitle,
  donePress,
  listHobby,
}) => {
  const profileStore = useProfileStore();
  // console.log('actionSheetTitle.type', actionSheetTitle.type);

  const [isSelect, setisSelect] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  useEffect(() => {
    if (listHobby[actionSheetTitle.type]) {
      actionSheetTitle.bigTitle === 'Thông tin thêm về tôi'
        ? setisSelect(listHobby[actionSheetTitle.type] || [])
        : setSelectedItems(
            listHobby[actionSheetTitle.type]?.map(item => item) || [],
          );
    } else {
      actionSheetTitle.bigTitle === 'Thông tin thêm về tôi'
        ? setisSelect([])
        : setSelectedItems([]);
    }
  }, [isOpen]);
  const handleItemClick = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter(selectedItem => selectedItem !== item),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  return (
    <>
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
              <Pressable
                onPress={() => {
                  donePress(
                    actionSheetTitle.type,
                    actionSheetTitle.bigTitle == 'Thông tin thêm về tôi'
                      ? isSelect
                      : selectedItems,
                  );
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
                {actionSheetTitle.bigTitle}
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

            {/* bottom */}
            <View style={{paddingVertical: 25, flexDirection: 'row'}}>
              {actionSheetTitle.icon}
              <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
                {actionSheetTitle?.smallTitle} của bạn?
              </Text>
            </View>
            <View
              style={{
                width: '80%',
                flexWrap: 'wrap',
                flexDirection: 'row',
                paddingBottom: 25,
              }}>
              {actionSheetTitle.bigTitle == 'Thông tin thêm về tôi'
                ? data.map(item => {
                    return (
                      <Chip
                        key={item._id}
                        content={item.name}
                        isHighlight={isSelect.includes(item._id) ? true : false}
                        onPress={() => {
                          isSelect.length === 1 && isSelect[0] === item._id
                            ? setisSelect([])
                            : setisSelect([item._id]);
                          // setisSelect(pre => {
                          //   return pre[0] === item._id ? [] : [item._id];
                          // });
                        }}
                      />
                    );
                  })
                : data.map(item => {
                    return (
                      <Chip
                        key={item._id}
                        content={item.name}
                        isHighlight={
                          selectedItems.includes(item._id) ? true : false
                        }
                        onPress={() => handleItemClick(item._id)}
                      />
                    );
                  })}
            </View>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default ActionsheetCustom;
