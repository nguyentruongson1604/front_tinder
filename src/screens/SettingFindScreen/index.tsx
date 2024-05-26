/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react-lite';
import {HobbyChoose, SettingTitle} from '../SettingScreen';
import {Pressable, View} from 'react-native';
import MultiSliderSelect from '../../components/atoms/MultiSliderSelect';
import SingleSlider from '../../components/atoms/SingleSlider';
import {useState} from 'react';
import {usePreferencesStore, useProfileStore} from '../../store';
import {ModalCustom} from '../../components/atoms/Modal';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { convertGender } from '../EditHobbyScreen';

export const SettingFindScreen = observer(() => {
  const profileStore = useProfileStore();
  const preferencesStore = usePreferencesStore();
  const [distance, setDistance] = useState<number[]>([100]);
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState<string>('Male');
  const [minmaxAge, setMinMaxAge] = useState<number[]>([18, 100]);
  const navigation = useNavigation();
  const handlePressPopup = (gender: string) => {
    setGender(gender);
    preferencesStore.setDataUpdate('gender', gender);
    setModalVisible(false);
  };
  const handleMinMaxAge = (age: number[]) => {
    setMinMaxAge(age);
    preferencesStore.setDataUpdate('age', {minAge: age[0], maxAge: age[1]});
  };
  const handleDistance = (distance: number[]) => {
    setDistance(distance);
    preferencesStore.setDataUpdate('distance', distance[0]);
  };

  const handleUploadImg = async () => {
    profileStore.updateMyCreatePhotos(profileStore.dataUpdate.photos || []);
  };
  const handleCreateProfile = async () => {
    profileStore.createProfile(profileStore.dataUpdate);
  };
  const handleUpdatePreferences = async () => {
    preferencesStore.updatePreferences(preferencesStore.dataUpdate);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#aaaae13b'}}>
      <SettingTitle title="Cài đặt tìm kiếm" />
      <View>
        <MultiSliderSelect value={minmaxAge} setValue={handleMinMaxAge} />
        <HobbyChoose
          title="Hiển thị cho tôi"
          content={convertGender[gender]}
          isPress
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <SingleSlider
          value={distance}
          setValue={handleDistance}
          title="Khoảng cách ưu tiên"
          unit="km"
          start={0}
          end={100}
          // init={profileStore.age}
        />
      </View>
      <ModalCustom
        open={modalVisible}
        handlePress={handlePressPopup}
        title="Hiển thị cho tôi"
      />
      <View style={{width: '100%', alignItems: 'center', marginTop: 60}}>
        <Pressable
          onPress={async () => {
            await handleCreateProfile();
            await handleUpdatePreferences();
            // await handleUploadImg();
          }}>
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
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              Hoàn tất
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
});
