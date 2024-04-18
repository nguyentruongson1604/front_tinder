/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react-lite';
import {Text, View} from 'react-native';
import SelectImage from '../../components/atoms/SelectImage';
import {useState} from 'react';
import ActionsheetPicker from '../../components/atoms/ActionSheetPicker';
import {useDisclose} from 'native-base';
import {
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useProfileStore} from '../../store';
import {Pressable} from 'react-native';
import {uploadImageAPI} from '../../APIs/profile.api';
import LinearGradient from 'react-native-linear-gradient';

export const EditImageScreen = observer(() => {
  const profileStore = useProfileStore();
  const [arrImage, setArrImage] = useState<(string | undefined)[]>(
    profileStore.photos.imageProfileUrl || [],
  );
  const [num, setNum] = useState<number>(0);
  const {isOpen, onOpen, onClose} = useDisclose();
  //   console.log('arrImage', arrImage[8]);
  //   console.log(arrImage);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorCode);
      } else {
        let imageUri = response.assets?.[0]?.uri;
        // let imgPath = response.assets?.[0]?.;
        onClose();
        const newArr = [...arrImage];
        newArr[num] = imageUri;
        setArrImage(newArr);
        // setArrImage(pre => [...pre, (pre[num] = imageUri)]);
        // const formData = new FormData();
        // formData.append('file', {
        //   uri: imageUri,
        //   type: 'image/jpeg', // Thay đổi loại tệp tùy thuộc vào định dạng ảnh
        //   name: 'image.jpg',
        // });

        // const res = uploadImageAPI(formData);
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
        // setSelectedImage(imageUri);
      }
    });
  };
  const openActionSheet = (index: number) => {
    setNum(index);
    onOpen();
  };
  const deleteSelectPicture = (index: number) => {
    const newArr = [...arrImage];
    newArr[index] = undefined;
    setArrImage(newArr);
    // setArrImage(pre => pre.splice(index, 1));
  };

  const convertArr = (originArr: (string | undefined)[]) => {
    return originArr.filter(item => {
      if (item) return item;
    });
  };

  const handleUpload = async () => {
    profileStore.updateMyPhotos(convertArr(arrImage));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#aaaae13b',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {/* <ScrollView style={{flex: 1, backgroundColor: '#aaaae13b'}}> */}

      {Array.from({length: 9}, (_, index) => {
        return (
          <SelectImage
            key={index}
            openActionSheet={openActionSheet}
            indexKey={index}
            imageSelect={arrImage[index]}
            deleteSelectPicture={deleteSelectPicture}
          />
        );
      })}
      <Pressable onPress={handleUpload}>
        <LinearGradient
          colors={['#F63A6E', '#e67091', '#eda084']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            height: 30,
            width: 150,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Press me</Text>
        </LinearGradient>
      </Pressable>
      <ActionsheetPicker
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleClickFirstItem={handleCameraLaunch}
        handleClickSecondItem={openImagePicker}
      />
      {/* </ScrollView> */}
    </View>
  );
});
