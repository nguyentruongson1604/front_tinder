import {makeAutoObservable} from 'mobx';
import {loginAPI, registerAPI} from '../../APIs/User.api';
import {RootStore} from '../RootStore';

export interface IUserAccess {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export class UserStore {
  userAccess: IUserAccess | null = null;
  constructor(rootStore: RootStore) {
    makeAutoObservable(rootStore);
  }

  setUser = (user: IUserAccess) => {
    this.userAccess = user;
  };
  userLogin = async (account: {email: string; password: string}) => {
    try {      
      const res = await loginAPI(account);            
      this.userAccess = res.data;
      console.log('store', this.userAccess);
      
      return res;
    } catch (error: any) {
      console.log(error);
      
      return error.response.data;
    }
  };
  userRegister = async (account: IUserAccess) => {
    try {            
      const res = await registerAPI(account);      
      return res;
    } catch (error: any) {
      console.log(error.response.data);
      return error.response.data;
    }
  };
}
