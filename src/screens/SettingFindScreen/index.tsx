/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react-lite';
import {HobbyChoose, SettingTitle} from '../SettingScreen';
import {View} from 'react-native';
import MultiSliderSelect from '../../components/atoms/MultiSliderSelect';
import SingleSlider from '../../components/atoms/SingleSlider';
import {useState} from 'react';
import {useProfileStore} from '../../store';
import {ModalCustom} from '../../components/atoms/Modal';

export const SettingFindScreen = observer(() => {
  const profileStore = useProfileStore();
  const [distance, setDistance] = useState<number[]>(
    [profileStore.preferences.distance] || [100],
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState<string>(
    profileStore.preferences.gender || '',
  );
  const [minmaxAge, setMinMaxAge] = useState<number[]>(
    [
      profileStore.preferences.age.minAge,
      profileStore.preferences.age.maxAge,
    ] || [18, 100],
  );
  const handlePressPopup = (gender: string) => {
    setGender(gender);
    setModalVisible(false);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#aaaae13b'}}>
      <SettingTitle title="Cài đặt tìm kiếm" />
      <View>
        <MultiSliderSelect value={minmaxAge} setValue={setMinMaxAge} />
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
          setValue={setDistance}
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
