import {makeAutoObservable} from 'mobx';
import {
  IProfile,
  getRandom10ProfileAPI,
  getRandomProfileAPI,
} from '../../APIs/profile.api';
import {RootStore} from '../RootStore';

export class ActivityStore {
  listProfile: IProfile[] = [];
  idArray: string[] = [];
  nextProfile: IProfile | undefined = undefined;
  curProfile: IProfile | undefined = undefined;
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
  }

  loadInitListProfiles = async () => {
    try {
      const res = await getRandom10ProfileAPI();

      this.listProfile = res.data;
      const list5IdArray = this.listProfile.map(item => item?._id as string);
      this.idArray.push(...list5IdArray);
    } catch (error) {
      console.error(error);
    }
  };

  deletePersonFromList = () => {
    if (this.listProfile.length > 1 && this.listProfile) {
      this.listProfile.shift();
    }
  };

  addOnePersonToList = async () => {
    try {
      const res = await getRandomProfileAPI(this.idArray);
      if (res.data.data) {
        this.listProfile.push(res.data.data);
        this.idArray.push(res.data.data._id);
      }
    } catch (error) {
      console.error(error);
    }
  };
}
