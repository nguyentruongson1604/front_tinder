import {View} from 'native-base';
import {useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import TopNavigator from '../../templates/TopNavigator';

const SelectImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    console.log('abc');

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorCode);
      } else {
        let imageUri = response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorCode);
      } else {
        let imageUri = response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  //   {selectedImage && (
  //     <Image
  //       source={{uri: selectedImage}}
  //       style={{width: 200, height: 200}}
  //     />
  //   )}

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
            }}></View>
          <View style={{width: '60%', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              Sửa thông tin
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
      <ScrollView style={{flex: 1, backgroundColor: '#aaaae13b'}}>
        <View
          style={{
            flex: 1,
            padding: 15,
          }}>
          <View
            style={{
              height: 150,
              width: 110,
              backgroundColor: '#d8d8e3',
              borderRadius: 10,
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: '#F63A6E',
            }}>
            {selectedImage && (
              <Image
                source={{uri: selectedImage}}
                style={{flex: 1, borderRadius: 10}}
              />
            )}
            <Pressable
              style={{
                position: 'absolute',
                bottom: -10,
                right: -10,
                zIndex: 1,
              }}
              onPress={openImagePicker}>
              <FontAwesome6
                name="circle-plus"
                style={{
                  color: '#F63A6E',
                  fontSize: 30,
                }}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

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
