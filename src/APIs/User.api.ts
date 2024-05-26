import axios, {AxiosRequestConfig} from 'axios';
import {axiosInstanceOptions, createAxiosInstance} from '../instance/instances';
import { ipAdressAdroid } from './activity.api';

export const registerAPI = async (account: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const option: AxiosRequestConfig = {
    method: 'POST',
    url: `${ipAdressAdroid}register`,
    // url: 'http://192.168.100.57:3031/api/register',
    data: account,
    headers: {
      accept: 'application/json',
    },
  };
  return await axios(option);
};

export const loginAPI = async (account: {email: string; password: string}) => {
  const option: AxiosRequestConfig = {
    method: 'POST',
    url: `${ipAdressAdroid}login`,
    // url: 'http://192.168.100.57:3031/api/login',
    // url: 'http://192.168.55.112:3031/api/login',
    data: account,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  return await axios(option);
};

export const getCurrentUserAPI = async () => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}getCurrentUser`,
    // url: 'http://192.168.55.112:3031/api/getRandom10Profile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  const instance = createAxiosInstance(option);
  const res = await instance.get('/');
  return res;
};

export const resetPasswordByMailAPI = async (email: {emailRest: string}) => {
  const option: AxiosRequestConfig = {
    method: 'POST',
    url: `${ipAdressAdroid}resetPasswordByMail`,
    // url: 'http://192.168.100.57:3031/api/login',
    // url: 'http://192.168.55.112:3031/api/login',
    data: email,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  return await axios(option);
};

export const changePasswordAPI = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}changePassword`,
    // url: 'http://192.168.55.112:3031/api/getRandom10Profile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  const instance = createAxiosInstance(option);
  const res = await instance.post('/', data);
  return res;
};
