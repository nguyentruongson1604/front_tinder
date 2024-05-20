import {makeAutoObservable, runInAction} from 'mobx';
import {
  IProfile,
  checkExistProfileAPI,
  createProfileAPI,
  getListMatchAPI,
  getMyProfileAPI,
  updateListMatchAPI,
  updateMyProfileAPI,
  uploadImageAPI,
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
interface IListMatch {
  user: string;
  firstName: string;
  lastName: string;
  photos: IPhotos;
}
export class ProfileStore {
  myProfile: IProfile | null = null;
  listHobby: IListHobby = {};
  description: string = '';
  title: string = '';
  adress: string = '';
  age: number = 18;
  gender: string = '';
  preferences: IPreferences = {
    gender: '',
    age: {minAge: 18, maxAge: 100},
    distance: 100,
  };
  photos: IPhotos = {
    imageProfileUrl: [],
  };
  listMatch: IListMatch[] = [];
  dataUpdate: IProfile = {};

  isUpload: boolean = false;
  existProfile: boolean = false;
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
    } catch (error) {
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
    console.log('this.dataUpdate', this.dataUpdate);
  };
  createProfile = async (profile: IProfile) => {
    try {
      const res = await createProfileAPI(profile);
    } catch (error) {
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
        onPressButton: () => {
          this.existProfile = true;
        },
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

  updateListMatch = async (otherUser: string) => {
    try {
      const {data} = await updateListMatchAPI(otherUser);
      //update o backend kho qua thi dung get
      runInAction(() => {});
    } catch (error) {
      console.error(error);
    }
  };
}
