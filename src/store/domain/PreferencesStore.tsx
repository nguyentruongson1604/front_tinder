import {makeAutoObservable, runInAction} from 'mobx';
import {RootStore} from '../RootStore';
import {updatePreferencesAPI} from '../../APIs/preferences.api';

export interface IUpdatePreferences {
  gender?: string;
  age?: {minAge: number; maxAge: number};
  distance?: number;
}
export class PreferencesStore {
  dataUpdate: IUpdatePreferences = {};
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }
  updatePreferences = async (profile: IUpdatePreferences) => {
    try {
      const res = await updatePreferencesAPI(profile);

      runInAction(() => {
        this.rootStore.profileStore.preferences.gender = res.data.data.gender;
        this.rootStore.profileStore.preferences.age.minAge =
          res.data.data.age.minAge;
        this.rootStore.profileStore.preferences.age.maxAge =
          res.data.data.age.maxAge;
        this.rootStore.profileStore.preferences.distance =
          res.data.data.distance;
      });
    } catch (error) {
      this.rootStore.appStore.setError(
        error.response.data.statusCode,
        error.response.data.message,
      );
    }
  };
}
