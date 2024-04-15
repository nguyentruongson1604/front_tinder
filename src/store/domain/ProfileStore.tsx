import {makeAutoObservable, runInAction} from 'mobx';
import {
  IProfile,
  getMyProfileAPI,
  updateMyProfileAPI,
} from '../../APIs/profile.api';
import {RootStore} from '../RootStore';

export interface IListHobby {
  [key: string]: {id: string; name: string}[];
}

interface IPreferences {
  gender: string;
  age: {minAge: number; maxAge: number};
  distance: number;
}
export class ProfileStore {
  myProfile: IProfile | null = null;
  listHobby: IListHobby = {};
  description: string = '';
  title: string = '';
  age: number = 18;
  gender: string = '';
  preferences: IPreferences = {
    gender: '',
    age: {minAge: 18, maxAge: 100},
    distance: 100,
  };

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
        this.age = res.data.data.age;
        this.gender = res.data.data.gender;
        this.preferences.gender = res.data.data.preferences.gender;
        this.preferences.age.minAge = res.data.data.preferences.age.minAge;
        this.preferences.age.maxAge = res.data.data.preferences.age.maxAge;
        this.preferences.distance = res.data.data.preferences.distance;
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
        listHobby[item.type].push({id: item._id, name: item.name});
      });
    }

    this.listHobby = listHobby;
  };
  setAge = (age: number) => {
    this.age = age;
  };
  updateMyProfile = async (profile?: IProfile) => {
    try {
      const res = await updateMyProfileAPI(profile);
      this.myProfile = res.data;
    } catch (error) {
      return error;
    }
  };
}
