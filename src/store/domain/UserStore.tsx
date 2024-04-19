import {makeAutoObservable, runInAction} from 'mobx';
import {getCurrentUserAPI, loginAPI, registerAPI} from '../../APIs/user.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStore} from '../RootStore';

export interface IUserAccess {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export class UserStore {
  accessToken: any = null;
  userAccess: IUserAccess | null = null;
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  setUser = (user: IUserAccess) => {
    this.userAccess = user;
  };
  userLogin = async (account: {email: string; password: string}) => {
    try {
      const res = await loginAPI(account);
      console.log(res.data.data);

      runInAction(() => {
        this.userAccess = res.data.data;
        if (res.data.accessToken && res.data.refreshToken) {
          AsyncStorage.setItem('accessToken', res.data.accessToken);
          AsyncStorage.setItem('refreshToken', res.data.refreshToken);
        }
      });
      console.log('this.userAccess', this.userAccess);

      return res;
    } catch (error: any) {
      return error.response;
    }
  };
  userRegister = async (account: IUserAccess) => {
    try {
      const res = await registerAPI(account);
      return res;
    } catch (error: any) {
      return error.response;
    }
  };
  isAuthenticated = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      this.accessToken = accessToken;
    } catch (error) {
      console.log(error);
    }
  };
  abc = async () => {
    const res = await AsyncStorage.getItem('accessToken');
    return res;
  };
  abcd = async () => {
    const res = await AsyncStorage.getItem('refreshToken');
    return res;
  };
  getCurrentUser = async () => {
    try {
      console.log('accessToken here', await this.abc());
      console.log('refreshToken', await this.abcd());

      const res = await getCurrentUserAPI();
      console.log('res', res);

      runInAction(() => {
        this.userAccess = res.data.data;
      });
    } catch (error) {
      this.rootStore.appStore.setError(
        error.response.data.statusCode,
        error.response.data.message,
      );
    }
  };
  get infoUser() {
    return this.userAccess;
  }
}
