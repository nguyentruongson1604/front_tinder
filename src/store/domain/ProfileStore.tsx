import {makeAutoObservable} from 'mobx';
import {
  IProfile,
  getMyProfileAPI,
  updateMyProfileAPI,
} from '../../APIs/profile.api';
import {RootStore} from '../RootStore';

export class ProfileStore {
  myProfile: IProfile | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(rootStore);
  }

  getMyProfile = async () => {
    try {
      const res = await getMyProfileAPI();
      this.myProfile = res.data;
    } catch (error) {
      return error;
    }
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
