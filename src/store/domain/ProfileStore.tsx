import {makeAutoObservable, runInAction} from 'mobx';
import {
  IProfile,
  getMyProfileAPI,
  updateMyProfileAPI,
  uploadImageAPI,
} from '../../APIs/profile.api';
import {RootStore} from '../RootStore';

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
  dataUpdate: IProfile = {};
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
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
      console.log(this.photos.imageProfileUrl);
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
    const res = await uploadImageAPI(formData);
    this.photos.imageProfileUrl = res.data.data.photos.imageProfileUrl;
  };
  setDataUpdate = (key: string, data: any) => {
    this.dataUpdate = {
      ...this.dataUpdate,
      [key]: data,
    };
  };
}
