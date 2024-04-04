/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {ScrollView, useDisclose} from 'native-base';
import {Pressable, Text, TextInput, View} from 'react-native';
import {InputChoose} from '../../components/atoms/InputChoose';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Chip} from '../../components/atoms/ChipShow';
import {useHobbiesStore} from '../../store';
import {IHobbyType} from '../../store/domain/HobbiesStore';
import {useState} from 'react';
import ActionsheetCustom from '../../components/atoms/ActionSheet';

export interface IHobbyChoose {
  title?: string;
  icon?: any;
  textChoose?: string;
  type?: string;
  actionSheetTitle?: any;
  onPress?: any;
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
};

// const getHobbyNameFromType = async () => { await };
const HobbyChoose: React.FC<IHobbyChoose> = ({
  title,
  icon,
  textChoose,
  type,
  onPress,
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
                fontWeight: '600',
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
        height={50}
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
const EditHobbyScreen = () => {
  const hobbiesStore = useHobbiesStore();
  const [value, onChangeText] = useState('Useless Multiline Placeholder');
  const {isOpen, onOpen, onClose} = useDisclose();
  const [actionSheetTitle, setActionSheetTitle] = useState<IActionSheetTitle>({
    bigTitle: '',
    type: '',
    icon: null,
    smallTitle: '',
  });

  return (
    <ScrollView style={{backgroundColor: '#aaaae13b', flexGrow: 1}}>
      <View style={{marginBottom: 20, marginTop: 10}}>
        <HobbyTitle title="GIỚI THIỆU BẢN THÂN" important />
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={500}
          onChangeText={text => onChangeText(text)}
          value={value}
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
          onChangeText={text => onChangeText(text)}
          value={value}
          style={{
            padding: 10,
            backgroundColor: 'white',
            minHeight: 60,
            fontSize: 16,
          }}
        />
      </View>
      <View style={{marginBottom: 20}}>
        <HobbyTitle title="THÔNG TIN THÊM VỀ TÔI" />
        {hobbiesStore?.arrType?.map((hobbyType: IHobbyType, index: number) => {
          const hobbyinfo = mainHobby[hobbyType.type];
          if (hobbyinfo) {
            return (
              <HobbyChoose
                icon={hobbyinfo.icon}
                title={hobbyinfo.title}
                textChoose="Thêm"
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
                  onOpen();
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
                textChoose="Thêm"
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
                  onOpen();
                }}
              />
            );
          } else {
            return null;
          }
        })}
      </View>
      <ActionsheetCustom
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        data={hobbiesStore.hobbiesByType}
        actionSheetTitle={actionSheetTitle}
      />
    </ScrollView>
  );
};
export default EditHobbyScreen;
