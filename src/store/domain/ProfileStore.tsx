import {makeAutoObservable} from 'mobx';
import {IProfile} from '../../APIs/profile.api';

export class ProfileStore {
  myProfile: IProfile | null = null;
  listProfile: [IProfile] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(rootStore);
  }

  getMyProfile;
}
