import {makeAutoObservable} from 'mobx';
import {IProfile, getRandom10ProfileAPI} from '../../APIs/profile.api';
import {RootStore} from '../RootStore';

export class ActivityStore {
  listProfile: [IProfile] | [] = [];
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
  }

  loadInitListProfiles = async () => {
    try {
      console.log('heree');

      const res = await getRandom10ProfileAPI();
      console.log(res.data);

      this.listProfile = res.data;
    } catch (error) {
      console.log(error);
    }
  };
}
