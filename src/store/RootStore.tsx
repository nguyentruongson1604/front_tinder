import {UserStore} from './domain/UserStore';

export interface IRootStore {
  userStore: UserStore;
}

export class RootStore implements IRootStore {
  userStore: UserStore;
  constructor() {
    this.userStore = new UserStore(this);
  }
}
