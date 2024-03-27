import {UserStore} from './domain/UserStore';

export interface IRootStore {
  userStore: UserStore;
}

export class RootStore implements IRootStore {
  userStore: UserStore;
  init = async () => {
    await this.userStore.isAuthenticated();
  };
  constructor() {
    this.userStore = new UserStore(this);
    this.init();
  }
}
