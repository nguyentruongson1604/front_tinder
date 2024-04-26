/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react-lite';
import {HobbyChoose, SettingTitle} from '../SettingScreen';
import {View} from 'react-native';
import MultiSliderSelect from '../../components/atoms/MultiSliderSelect';
import SingleSlider from '../../components/atoms/SingleSlider';
import {useState} from 'react';
import {usePreferencesStore} from '../../store';
import {ModalCustom} from '../../components/atoms/Modal';

export const SettingFindScreen = observer(() => {
  const preferencesStore = usePreferencesStore();
  const [distance, setDistance] = useState<number[]>([100]);
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState<string>('Male');
  const [minmaxAge, setMinMaxAge] = useState<number[]>([18, 100]);
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
  return (
    <View style={{flex: 1, backgroundColor: '#aaaae13b'}}>
      <SettingTitle title="Cài đặt tìm kiếm" />
      <View>
        <MultiSliderSelect value={minmaxAge} setValue={handleMinMaxAge} />
        <HobbyChoose
          title="Hiển thị cho tôi"
          content={gender}
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
    </View>
  );
});
