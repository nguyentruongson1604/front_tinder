import {makeAutoObservable, runInAction} from 'mobx';
import {
  IProfile,
  checkExistProfileAPI,
  createProfileAPI,
  getListMatchAPI,
  getMyProfileAPI,
  updateLocationAPI,
  updateListMatchAPI,
  updateMyProfileAPI,
  uploadImageAPI,
  getListMatchWithoutArrangeAPI,
  getOtherProfileAPI,
} from '../../APIs/profile.api';
import {RootStore} from '../RootStore';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';

// export interface IListHobby {
//   [key: string]: {id: string; name: string}[];
// }

export interface IListHobby {
  [key: string]: [value: string];
}
export interface IPreferences {
  gender: string;
  age: {minAge: number; maxAge: number};
  distance: number;
}
interface IPhotos {
  imageProfileUrl: string[];
}
export interface IListMatch {
  user: string;
  firstName: string;
  lastName: string;
  photos: IPhotos;
}
export interface ILocation {
  longitude: number | string;
  latitude: number | string;
}
export class ProfileStore {
  myProfile: IProfile | null = null;
  listHobby: IListHobby = {};
  description: string = '';
  title: string = '';
  adress: string = '';
  age: number = 18;
  gender: string = '';
  location: ILocation = {longitude: 0, latitude: 0};
  preferences: IPreferences = {
    gender: '',
    age: {minAge: 18, maxAge: 100},
    distance: 100,
  };
  photos: IPhotos = {
    imageProfileUrl: [],
  };
  listMatch: IListMatch[] = [];
  listMatchWithoutArrange: IListMatch[] = [];
  dataUpdate: IProfile = {};

  isUpload: boolean = false;
  existProfile: boolean = false;
  isCreateProfile: boolean = false;
  loading: boolean = false;
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }
  setLoading(loading: boolean) {
    this.loading = loading;
  }
  getMyProfile = async () => {
    try {
      const res = await getMyProfileAPI();

      runInAction(() => {
        this.myProfile = res.data.data;
        this.getListHobby();
        this.description = res.data.data.description;
        this.title = res.data.data.title;
        this.adress = res.data.data.adress;
        this.age = res.data.data.age;
        this.gender = res.data.data.gender;
        this.preferences.gender = res.data.data.preferences.gender;
        this.preferences.age.minAge = res.data.data.preferences.age.minAge;
        this.preferences.age.maxAge = res.data.data.preferences.age.maxAge;
        this.preferences.distance = res.data.data.preferences.distance;
        this.photos.imageProfileUrl = res.data.data.photos.imageProfileUrl;
      });
    } catch (error) {
      console.error(error);
    }
  };
  getListMatch = async () => {
    try {
      const {data} = await getListMatchAPI();
      runInAction(() => {
        this.listMatch = data.data;
      });
    } catch (error) {
      console.error(error);
    }
  };
  getListMatchWArrange = async () => {
    try {
      const {data} = await getListMatchWithoutArrangeAPI();
      runInAction(() => {
        this.listMatchWithoutArrange = data.data;
      });
    } catch (error) {
      console.error(error);
    }
  };
  getListHobby = () => {
    const listHobby: IListHobby = {};
    if (this.myProfile?.hobby) {
      this.myProfile?.hobby.map(item => {
        listHobby[item.type] = listHobby[item.type] || [];
        listHobby[item.type].push(item._id);
      });
    }

    this.listHobby = listHobby;
  };
  setAge = (age: number) => {
    this.age = age;
  };
  updateMyProfile = async (profile: IProfile) => {
    try {
      const res = await updateMyProfileAPI(profile);
      runInAction(() => {
        this.myProfile = res.data.data;
        this.getListHobby();
        this.description = res.data.data.description;
        this.title = res.data.data.title;
        this.adress = res.data.data.adress;
        this.age = res.data.data.age;
        this.gender = res.data.data.gender;
      });
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Succes',
        textBody: 'Sửa thông tin thành công',
        button: 'OK',
      });
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'ERROR',
        textBody: 'Lỗi khi sửa thông tin',
        button: 'OK',
      });
      console.error(error);
    }
  };
  updateMyPhotos = async (arrImages: any) => {
    const formData = new FormData();
    arrImages.forEach((file, index) => {
      formData.append(`files`, {
        name: `${Date.now()}.jpg`,
        file: file,
        uri: file,
        type: 'image/jpeg',
      });
    });
    try {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Waiting...',
        textBody: 'Ảnh đang tải lên vui lòng đợi',
        closeOnOverlayTap: false,
      });
      const res = await uploadImageAPI(formData);
      this.isUpload = true;
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Succes',
        textBody: 'Ảnh tải lên thành công',
        button: 'OK',
      });
      this.photos.imageProfileUrl = res.data.data.photos.imageProfileUrl;
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'ERROR',
        textBody: `${
          error.response.data.message || 'Ảnh tải lên không thành công'
        }`,
        button: 'OK',
      });
    }
  };

  setDataUpdate = (key: string, data: any) => {
    this.dataUpdate = {
      ...this.dataUpdate,
      [key]: data,
    };
  };
  createProfile = async (profile: IProfile) => {
    try {
      this.setLoading(true);
      const res = await createProfileAPI(profile);
      this.setLoading(false);
    } catch (error) {
      this.setLoading(false);
      console.error(error);
    }
  };
  checkExistPofile = async () => {
    try {
      this.setLoading(true);

      const res = await checkExistProfileAPI();
      if (res.data.data) this.existProfile = true;
      this.setLoading(false);
    } catch (error) {
      this.setLoading(false);

      console.error('checkExistPofile', error);
    }
  };
  updateMyCreatePhotos = async (arrImages: any) => {
    const formData = new FormData();
    arrImages.forEach((file, index) => {
      formData.append(`files`, {
        name: `${Date.now()}.jpg`,
        file: file,
        uri: file,
        type: 'image/jpeg',
      });
    });
    try {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Waiting...',
        textBody: 'Hồ sơ đang được tạo vui lòng đợi',
        closeOnOverlayTap: false,
      });
      const res = await uploadImageAPI(formData);
      this.isUpload = true;
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Succes',
        textBody: 'Hãy cùng hẹn hò nào!!',
        button: 'OK',
      });
      this.photos.imageProfileUrl = res.data.data.photos.imageProfileUrl;
      return true;
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'ERROR',
        textBody: `${
          error.response.data.message || 'Ảnh tải lên không thành công'
        }`,
        button: 'OK',
      });
      return false;
    }
  };
  updateMyCreateProfile = async (profile: IProfile) => {
    try {
      const res = await updateMyProfileAPI(profile);
      runInAction(() => {
        this.myProfile = res.data.data;
        this.getListHobby();
        this.description = res.data.data.description;
        this.title = res.data.data.title;
        this.adress = res.data.data.adress;
        this.age = res.data.data.age;
        this.gender = res.data.data.gender;
      });
      // Dialog.show({
      //   type: ALERT_TYPE.SUCCESS,
      //   title: 'Succes',
      //   textBody: 'Sửa thông tin thành công',
      //   button: 'OK',
      // });
    } catch (error) {
      // Dialog.show({
      //   type: ALERT_TYPE.DANGER,
      //   title: 'ERROR',
      //   textBody: 'Lỗi khi sửa thông tin',
      //   button: 'OK',
      // });
      console.error(error);
    }
  };
  updateListMatch = async (otherUser: any) => {
    try {
      // console.log('otherUser', otherUser);
      console.log('otherUser', {
        userId: otherUser.user._id,
        profileId: otherUser._id,
      });

      const {data} = await updateListMatchAPI({
        userId: otherUser.user._id,
        profileId: otherUser._id,
      });
      //update o backend kho qua thi dung get
      runInAction(() => {
        const newUser: IListMatch = {
          user: otherUser.user._id,
          firstName: otherUser.user.firstName,
          lastName: otherUser.user.lastName,
          photos: {
            imageProfileUrl: otherUser?.photos?.imageProfileUrl || '',
          },
        };
        this.listMatch = [newUser, ...this.listMatch].map(item => item);
      });
      return {
        otherUser: otherUser.user._id,
        user: data.data.user,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        photos: {
          imageProfileUrl: data.data.photos.imageProfileUrl,
        },
      };
    } catch (error) {
      console.error(error);
    }
  };
  updateLocation = async (location: ILocation) => {
    try {
      await updateLocationAPI(location);
    } catch (error) {
      console.error(error);
    }
  };

  getOtherProfile = async (userId: {user: string}) => {
    try {
      const {data} = await getOtherProfileAPI(userId);
      console.log('dataa', data.data?.user);

      return data?.data;
    } catch (error) {
      return {};
    }
  };
  setListMatch = (data: IListMatch[]) => {
    this.listMatch = data;
  };
  deleteDataWhenLogout = () => {
    this.description = '';
    this.title = '';
    this.adress = '';
    this.age = 18;
    this.gender = 'Male';
    this.preferences.gender = 'Female';
    this.preferences.age.minAge = 18;
    this.preferences.age.maxAge = 100;
    this.preferences.distance = 100;
    this.photos.imageProfileUrl = [];
  };
}
