/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Actionsheet, Button, useDisclose} from 'native-base';
import {Text} from 'react-native';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ActionsheetPicker = ({
  isOpen,
  onOpen,
  onClose,
  handleClickFirstItem,
  handleClickSecondItem,
}) => {
  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={handleClickFirstItem}
            startIcon={
              <View
                style={{
                  backgroundColor: '#5e5d5d46',
                  borderRadius: 45,
                  width: 45,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons name="camera" style={{fontSize: 30}} />
              </View>
            }>
            <Text
              style={{
                flex: 1,
                lineHeight: 45,
                fontSize: 17,
                fontWeight: '500',
              }}>
              Take a picture
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={handleClickSecondItem}
            startIcon={
              <View
                style={{
                  backgroundColor: '#5e5d5d46',
                  borderRadius: 45,
                  width: 45,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons name="photo" style={{fontSize: 30}} />
              </View>
            }>
            <Text
              style={{
                flex: 1,
                lineHeight: 45,
                fontSize: 17,
                fontWeight: '500',
              }}>
              Get photo from gallery
            </Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default ActionsheetPicker;
