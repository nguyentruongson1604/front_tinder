import {makeAutoObservable} from 'mobx';
import {
  IProfile,
  getRandom10ProfileAPI,
  getRandomProfileAPI,
} from '../../APIs/profile.api';
import {RootStore} from '../RootStore';
import {updateActivityAPI} from '../../APIs/activity.api';

export interface IUpdateActivity {
  senderUser: string;
  senderType: string;
  receiverUser: string;
  receiverType: string;
}
export class ActivityStore {
  listProfile: IProfile[] = [];
  idArray: string[] = [];
  nextProfile: IProfile | undefined = undefined;
  curProfile: IProfile | undefined = undefined;
  loading: boolean = false;
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }
  setLoading(loading: boolean) {
    this.loading = loading;
  }
  loadInitListProfiles = async () => {
    try {
      this.setLoading(true);
      const res = await getRandom10ProfileAPI();

      this.listProfile = res.data;
      const list5IdArray = this.listProfile.map(item => item?._id as string);
      this.idArray.push(...list5IdArray);
      this.setLoading(false);
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

  updateActivity = async (profile: IProfile, type: string) => {
    try {
      const res = await updateActivityAPI({
        senderUser: profile.user._id,
        senderType: type,
        receiverUser: profile.user._id,
        receiverType: type,
      });
      if (res.data.status === 'match') return true;
      else return false;
    } catch (error) {
      console.error(error);
    }
  };
}
