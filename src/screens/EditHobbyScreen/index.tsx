/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {ScrollView, useDisclose} from 'native-base';
import {Text, TextInput, View} from 'react-native';
import {InputChoose} from '../../components/atoms/InputChoose';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Chip} from '../../components/atoms/ChipShow';
import {useHobbiesStore, useProfileStore} from '../../store';
import {IHobbyType} from '../../store/domain/HobbiesStore';
import {useEffect, useState} from 'react';
import ActionsheetCustom from '../../components/atoms/ActionSheet';
import SingleSlider from '../../components/atoms/SingleSlider';
import {observer} from 'mobx-react-lite';
import {ModalCustom} from '../../components/atoms/Modal';
import {IListHobby} from '../../store/domain/ProfileStore';
import {ActionSheetInput} from '../../components/atoms/ActionSheetInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export interface IHobbyChoose {
  title?: string;
  icon?: any;
  textChoose?: string;
  type?: string;
  actionSheetTitle?: any;
  onPress?: any;
  isAdress?: boolean;
}
export interface IHobbyTitle {
  title?: string;
  icon?: any;
  textChoose?: string;
  important?: boolean;
}
export interface IActionSheetTitle {
  bigTitle: string;
  type: string;
  icon?: any;
  smallTitle: string;
}
const mainHobby = {
  zodiac: {
    icon: <Ionicons name="moon" style={{fontSize: 22, color: '#948d8d'}} />,
    actionSheetIcon: (
      <Ionicons
        name="moon"
        style={{fontSize: 22, marginRight: 10, color: '#F63A6E'}}
      />
    ),
    title: 'Cung hoàng đạo',
  },
  education: {
    icon: <Ionicons name="school" style={{fontSize: 22, color: '#948d8d'}} />,
    actionSheetIcon: (
      <Ionicons
        name="school"
        style={{fontSize: 22, marginRight: 10, color: '#F63A6E'}}
      />
    ),
    title: 'Trình độ học vấn',
  },

  things: {
    icon: (
      <MaterialCommunityIcons
        name="heart-cog"
        style={{fontSize: 22, color: '#948d8d'}}
      />
    ),
    actionSheetIcon: (
      <MaterialCommunityIcons
        name="heart-cog"
        style={{fontSize: 22, marginRight: 10, color: '#F63A6E'}}
      />
    ),
    title: 'Ngôn ngữ tình yêu',
  },
};

const supportHobby = {
  pet: {
    icon: (
      <MaterialIcons name="pets" style={{fontSize: 22, color: '#948d8d'}} />
    ),
    actionSheetIcon: (
      <MaterialIcons
        name="pets"
        style={{fontSize: 22, marginRight: 10, color: '#F63A6E'}}
      />
    ),
    title: 'Thú cưng',
  },
  sport: {
    icon: (
      <FontAwesome6
        name="basketball"
        style={{fontSize: 22, color: '#948d8d'}}
      />
    ),
    actionSheetIcon: (
      <FontAwesome6
        name="basketball"
        style={{fontSize: 22, marginRight: 10, color: '#F63A6E'}}
      />
    ),
    title: 'Môn thể thao',
  },
  drink: {
    icon: <Entypo name="drink" style={{fontSize: 22, color: '#948d8d'}} />,
    actionSheetIcon: (
      <Entypo
        name="drink"
        style={{fontSize: 22, marginRight: 10, color: '#F63A6E'}}
      />
    ),
    title: 'Đồ uống',
  },
  communication: {
    icon: (
      <Ionicons
        name="chatbox-ellipses"
        style={{fontSize: 22, color: '#948d8d'}}
      />
    ),
    actionSheetIcon: (
      <Ionicons
        name="chatbox-ellipses"
        style={{fontSize: 22, marginRight: 10, color: '#F63A6E'}}
      />
    ),
    title: 'Phong cách giao tiếp',
  },
};

// const getHobbyNameFromType = async () => { await };
const HobbyChoose: React.FC<IHobbyChoose> = ({
  title,
  icon,
  textChoose,
  type,
  onPress,
  isAdress,
}) => {
  const hobbiesStore = useHobbiesStore();

  return (
    <>
      <InputChoose
        leftChildren={
          <View style={{marginLeft: 15, flexDirection: 'row'}}>
            {icon}
            <Text style={{fontSize: 16, marginLeft: 8}}>{title}</Text>
          </View>
        }
        rightChildren={
          <>
            <Text
              style={{
                fontSize: 15,
                fontWeight: isAdress ? '500' : '600',
                marginRight: 3,
              }}>
              {textChoose}
            </Text>
            <Entypo
              name="chevron-small-right"
              style={{fontSize: 22, color: '#948d8d'}}
            />
          </>
        }
        borderBottom={false}
        borderTop={false}
        marginLeft={0}
        height={isAdress ? 'auto' : 50}
        onPress={async () => {
          await hobbiesStore.getHobbyNameFromType(type as string);
          onPress();
        }}
      />
    </>
  );
};

const HobbyTitle: React.FC<IHobbyTitle> = ({title, important}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      }}>
      <Octicons
        name="dot-fill"
        style={{fontSize: 16, color: '#F63A6E', marginRight: 8}}
      />
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 17,
        }}>
        {title}
      </Text>
      {important ? (
        <Chip
          content="quan trọng"
          marginBottom={1}
          marginLeft={8}
          paddingHorizontal={8}
          paddingVertical={3}
          backgroundColor="#F63A6E"
          color="white"
        />
      ) : null}
    </View>
  );
};
const EditHobbyScreen = observer(() => {
  const hobbiesStore = useHobbiesStore();
  const profileStore = useProfileStore();
  const [description, setDescription] = useState<string>(
    profileStore.description || '',
  );
  const [title, setTitle] = useState<string>(profileStore.title || '');
  const {
    isOpen: isOpenHobby,
    onOpen: onOpenHobby,
    onClose: onCloseHobby,
  } = useDisclose();

  const {
    isOpen: isOpenAdress,
    onOpen: onOpenAdress,
    onClose: onCloseAdress,
  } = useDisclose();
  const [actionSheetTitle, setActionSheetTitle] = useState<IActionSheetTitle>({
    bigTitle: '',
    type: '',
    icon: null,
    smallTitle: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState<number[]>([profileStore.age]);
  const [gender, setGender] = useState<string>(profileStore.gender || '');
  const [listHobby, setListHobby] = useState<IListHobby>(
    profileStore.listHobby || {},
  );
  const [adress, setAdress] = useState<string>(profileStore.adress || '');
  const handlePressPopup = (gender: string) => {
    setGender(gender);
    profileStore.setDataUpdate('gender', gender);
    setModalVisible(false);
  };
  const convertToArr = (hobbies: IListHobby) => {
    return Object.values(hobbies).flat();
  };
  const handleChangeHobbies = (key: string, value: [string]) => {
    setListHobby(pre => {
      return {...pre, [key]: value};
    });
    profileStore.setDataUpdate(
      'hobby',
      convertToArr({...listHobby, [key]: value}),
    );
  };
  const handleChangeAge = (age: any) => {
    setAge(age);
    profileStore.setDataUpdate('age', age[0]);
  };
  const handleChangeAdress = (adress: string) => {
    setAdress(adress);
    profileStore.setDataUpdate('adress', adress);
  };
  // profileStore.setDataUpdate({description});
  return (
    <ScrollView style={{backgroundColor: '#aaaae13b', flexGrow: 1}}>
      <View style={{marginBottom: 20, marginTop: 10}}>
        <HobbyTitle title="GIỚI THIỆU BẢN THÂN" />
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={500}
          onChangeText={text => {
            setDescription(text);
            profileStore.setDataUpdate('description', text);
          }}
          value={description}
          style={{
            padding: 10,
            backgroundColor: 'white',
            minHeight: 60,
            fontSize: 16,
          }}
        />
      </View>
      <View style={{marginBottom: 20}}>
        <HobbyTitle title="MỤC ĐÍCH HẸN HÒ" important />
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={500}
          onChangeText={text => {
            setTitle(text);
            profileStore.setDataUpdate('title', text);
          }}
          value={title}
          style={{
            padding: 10,
            backgroundColor: 'white',
            minHeight: 60,
            fontSize: 16,
          }}
        />
      </View>
      <View style={{marginBottom: 20}}>
        <HobbyTitle title="THÔNG TIN THÊM VỀ TÔI" important />
        <HobbyChoose
          title="Địa chỉ"
          textChoose={adress ? adress : 'Thêm'}
          isAdress
          onPress={() => {
            // setActionSheetTitle({
            //   bigTitle: 'Thông tin thêm về tôi',
            //   type: hobbyType.type,
            //   icon: hobbyinfo.actionSheetIcon,
            //   smallTitle: hobbyinfo.title,
            // });
            onOpenAdress();
          }}
        />
        <HobbyChoose
          title="Giới tính"
          textChoose={gender}
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <SingleSlider
          value={age}
          setValue={handleChangeAge}
          title="Tuổi của bạn"
          unit="tuổi"
          start={18}
          end={100}
          // init={profileStore.age}
        />

        {hobbiesStore?.arrType?.map((hobbyType: IHobbyType, index: number) => {
          const hobbyinfo = mainHobby[hobbyType.type];
          if (hobbyinfo) {
            return (
              <HobbyChoose
                icon={hobbyinfo.icon}
                title={hobbyinfo.title}
                textChoose={
                  listHobby[hobbyType?.type]
                    ? listHobby[hobbyType?.type].length
                      ? 'Sửa'
                      : 'Thêm'
                    : 'Thêm'
                }
                key={index}
                type={hobbyType?.type}
                actionSheetTitle={hobbyinfo}
                onPress={() => {
                  setActionSheetTitle({
                    bigTitle: 'Thông tin thêm về tôi',
                    type: hobbyType.type,
                    icon: hobbyinfo.actionSheetIcon,
                    smallTitle: hobbyinfo.title,
                  });
                  onOpenHobby();
                }}
              />
            );
          } else {
            return null;
          }
        })}
      </View>

      <View style={{marginBottom: 20}}>
        <HobbyTitle title="PHONG CÁCH SỐNG" />
        {hobbiesStore?.arrType?.map((hobbyType: IHobbyType, index: number) => {
          const hobbyinfo = supportHobby[hobbyType.type];
          if (hobbyinfo) {
            return (
              <HobbyChoose
                icon={hobbyinfo.icon}
                title={hobbyinfo.title}
                textChoose={listHobby[hobbyType?.type]?.length ? 'Sửa' : 'Thêm'}
                key={index}
                type={hobbyType?.type}
                actionSheetTitle={hobbyinfo}
                onPress={() => {
                  setActionSheetTitle({
                    bigTitle: 'Phong cách sống',
                    type: hobbyType.type,
                    icon: hobbyinfo.actionSheetIcon,
                    smallTitle: hobbyinfo.title,
                  });
                  onOpenHobby();
                }}
              />
            );
          } else {
            return null;
          }
        })}
      </View>

      <ActionsheetCustom
        isOpen={isOpenHobby}
        onClose={onCloseHobby}
        onOpen={onOpenHobby}
        data={hobbiesStore.hobbiesByType}
        actionSheetTitle={actionSheetTitle}
        donePress={handleChangeHobbies}
        listHobby={listHobby}
      />
      <ModalCustom
        open={modalVisible}
        handlePress={handlePressPopup}
        title="Hãy chọn giới tính của bạn"
      />

      <ActionSheetInput
        isOpen={isOpenAdress}
        onClose={onCloseAdress}
        onOpen={onOpenAdress}
        data={adress}
        donePress={handleChangeAdress}
      />
    </ScrollView>
  );
});
export default EditHobbyScreen;
