/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {View, useDisclose} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {observer} from 'mobx-react-lite';
interface ISelectImage {
  openActionSheet: any;
  indexKey: number;
  imageSelect: string | undefined;
  deleteSelectPicture: any;
}
const SelectImage: React.FC<ISelectImage> = observer(
  ({openActionSheet, indexKey, imageSelect, deleteSelectPicture}) => {
    //   {selectedImage && (
    //     <Image
    //       source={{uri: selectedImage}}
    //       style={{width: 200, height: 200}}
    //     />
    //   )}
    return (
      <>
        <View
          style={{
            width: '33.33%',
            paddingVertical: 15,
            paddingHorizontal: 17,
          }}>
          <View
            style={{
              height: 150,
              width: '100%',
              backgroundColor: '#d8d8e3',
              borderRadius: 10,
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: '#F63A6E',
            }}>
            {imageSelect && (
              <Image
                source={{uri: imageSelect}}
                style={{flex: 1, borderRadius: 10}}
              />
            )}
            {!imageSelect ? (
              <Pressable
                style={{
                  position: 'absolute',
                  bottom: -10,
                  right: -10,
                  zIndex: 1,
                  backgroundColor: 'white',
                  borderRadius: 30,
                }}
                onPress={() => openActionSheet(indexKey)}>
                <FontAwesome6
                  name="circle-plus"
                  style={{
                    color: '#F63A6E',
                    fontSize: 30,
                  }}
                />
              </Pressable>
            ) : (
              <Pressable
                style={{
                  position: 'absolute',
                  bottom: -10,
                  right: -10,
                  zIndex: 1,
                  backgroundColor: 'white',
                  borderRadius: 30,
                }}
                onPress={() => deleteSelectPicture(indexKey)}>
                <AntDesign
                  name="minuscircle"
                  style={{
                    color: '#F63A6E',
                    fontSize: 30,
                  }}
                />
              </Pressable>
            )}
          </View>
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  scrollContainer: {
    flex: 1,
    backgroundColor: '#a1a6d649',
    // backgroundColor: 'red',
  },
  item: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default SelectImage;
