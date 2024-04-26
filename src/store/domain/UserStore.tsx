import {makeAutoObservable, runInAction} from 'mobx';
import {
  changePasswordAPI,
  getCurrentUserAPI,
  loginAPI,
  registerAPI,
  resetPasswordByMailAPI,
} from '../../APIs/user.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStore} from '../RootStore';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';

export interface IUserAccess {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export class UserStore {
  accessToken: any = null;
  refreshToken: any = null;
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

      runInAction(() => {
        this.userAccess = res.data.data;
        if (res.data.accessToken && res.data.refreshToken) {
          AsyncStorage.setItem('accessToken', res.data.accessToken);
          AsyncStorage.setItem('refreshToken', res.data.refreshToken);
        }
      });

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
      // console.log('accessToken here', await this.abc());
      // console.log('refreshToken', await this.abcd());

      const res = await getCurrentUserAPI();
      runInAction(() => {
        this.userAccess = res.data.data;
      });
    } catch (error) {
      // this.rootStore.appStore.setError(
      //   error.response.data.statusCode,
      //   error.response.data.message,
      // );
      console.error(error);
    }
  };
  logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    this.accessToken = null;
  };
  get infoUser() {
    return this.userAccess;
  }
  resetPasswordByEmail = async (emailReset: any) => {
    try {
      const res = await resetPasswordByMailAPI(emailReset);
      if (res.data.status === 'success') {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Succes',
          textBody: 'Hãy kiểm tra Email của bạn và quay lại đăng nhập',
        });
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Fail',
          textBody: 'Đổi mật khẩu không thành công',
        });
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Fail',
        textBody: `${error.response.data.message}`,
      });
    }
  };

  changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const res = await changePasswordAPI({currentPassword, newPassword});
      if (res.data.status === 'success') {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Succes',
          textBody: 'Đổi mật khẩu thành công',
        });
      }
    } catch (error: any) {
      this.rootStore.appStore.setError(
        error.response.data.statusCode,
        error.response.data.message,
      );
      return {
        status: false,
        message: error.response.data.message || 'lỗi không thể đổi mật khẩu',
      };
    }
  };
}
