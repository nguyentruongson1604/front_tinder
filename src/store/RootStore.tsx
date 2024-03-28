import {ActivityStore} from './domain/ActivityStore';
import {ProfileStore} from './domain/ProfileStore';
import {UserStore} from './domain/UserStore';

export interface IRootStore {
  userStore: UserStore;
  profileStore: ProfileStore;
  activityStore: ActivityStore;
}

export class RootStore implements IRootStore {
  userStore: UserStore;
  profileStore: ProfileStore;
  activityStore: ActivityStore;
  init = async () => {
    await this.userStore.isAuthenticated();
  };
  constructor() {
    this.userStore = new UserStore(this);
    this.profileStore = new ProfileStore(this);
    this.activityStore = new ActivityStore(this);
    this.init();
  }
}
