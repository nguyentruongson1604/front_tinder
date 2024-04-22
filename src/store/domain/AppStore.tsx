import {makeAutoObservable} from 'mobx';
import {RootStore} from '../RootStore';

export class AppStore {
  status: string | null = null;
  statusCode: number | null = null;
  message: string | null = null;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  setError = (statusCode: number, message: string) => {
    this.statusCode = statusCode;
    this.message = message;
  };
  reset = () => {
    this.statusCode = null;
    this.message = null;
  };
}
