import axios, {AxiosRequestConfig} from 'axios';
import {axiosInstanceOptions, createAxiosInstance} from '../instance/instances';

export const registerAPI = async (account: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const option: AxiosRequestConfig = {
    method: 'POST',
    url: 'http://192.168.100.57:3031/api/register',
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
    url: 'http://192.168.100.57:3031/api/login',
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
    baseURL: 'http://192.168.100.57:3031/api/getCurrentUser',
    // url: 'http://192.168.55.112:3031/api/getRandom10Profile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  // const instance = createAxiosInstance(option);
  // const res = await instance.get('/');
  // return res;
  return await axios(option);
};
