import {makeAutoObservable} from 'mobx';
import {IProfile, getRandom10ProfileAPI} from '../../APIs/profile.api';
import {RootStore} from '../RootStore';

export class ActivityStore {
  listProfile: [IProfile] | [] = [];
  constructor(rootStore: RootStore) {
    makeAutoObservable(rootStore);
  }

  loadInitListProfiles = async () => {
    try {
      const res = await getRandom10ProfileAPI();
      this.listProfile = res.data;
    } catch (error) {
      return error;
    }
  };
}
