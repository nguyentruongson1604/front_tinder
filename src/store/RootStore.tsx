import {ActivityStore} from './domain/ActivityStore';
import {HobbiesStore} from './domain/HobbiesStore';
import {ProfileStore} from './domain/ProfileStore';
import {UserStore} from './domain/UserStore';

export interface IRootStore {
  userStore: UserStore;
  profileStore: ProfileStore;
  activityStore: ActivityStore;
  hobbiesStore: HobbiesStore;
}

export class RootStore implements IRootStore {
  userStore: UserStore;
  profileStore: ProfileStore;
  activityStore: ActivityStore;
  hobbiesStore: HobbiesStore;
  init = async () => {
    await this.userStore.isAuthenticated();
  };
  constructor() {
    this.userStore = new UserStore(this);
    this.profileStore = new ProfileStore(this);
    this.activityStore = new ActivityStore(this);
    this.hobbiesStore = new HobbiesStore(this);
    this.init();
  }
}
