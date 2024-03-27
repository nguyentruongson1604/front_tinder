import {makeAutoObservable} from 'mobx';
import {loginAPI, registerAPI} from '../../APIs/user.api';
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
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
  }

  setUser = (user: IUserAccess) => {
    this.userAccess = user;
  };
  userLogin = async (account: {email: string; password: string}) => {
    try {
      const res = await loginAPI(account);
      this.userAccess = res.data;
      if (res.data.accessToken && res.data.refreshToken) {
        AsyncStorage.setItem('accessToken', res.data.accessToken);
        AsyncStorage.setItem('refreshToken', res.data.refreshToken);
      }
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
}
