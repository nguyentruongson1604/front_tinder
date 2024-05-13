import {ActivityStore} from './domain/ActivityStore';
import {AppStore} from './domain/AppStore';
import {HobbiesStore} from './domain/HobbiesStore';
import {MessageStore} from './domain/MesageStore';
import {PreferencesStore} from './domain/PreferencesStore';
import {ProfileStore} from './domain/ProfileStore';
import {UserStore} from './domain/UserStore';

export interface IRootStore {
  userStore: UserStore;
  profileStore: ProfileStore;
  activityStore: ActivityStore;
  hobbiesStore: HobbiesStore;
  preferencesStore: PreferencesStore;
  messageStore: MessageStore;
  appStore: AppStore;
}

export class RootStore implements IRootStore {
  userStore: UserStore;
  profileStore: ProfileStore;
  activityStore: ActivityStore;
  hobbiesStore: HobbiesStore;
  preferencesStore: PreferencesStore;
  messageStore: MessageStore;
  appStore: AppStore;
  init = async () => {
    await this.userStore.isAuthenticated();
  };
  constructor() {
    this.userStore = new UserStore(this);
    this.profileStore = new ProfileStore(this);
    this.activityStore = new ActivityStore(this);
    this.hobbiesStore = new HobbiesStore(this);
    this.preferencesStore = new PreferencesStore(this);
    this.messageStore = new MessageStore(this);
    this.appStore = new AppStore(this);
    this.init();
  }
}
