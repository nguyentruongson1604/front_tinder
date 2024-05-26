import {axiosInstanceOptions, createAxiosInstance} from '../instance/instances';
import { ipAdressAdroid } from './activity.api';

export const getHobbiesTypeAPI = async () => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}getHobbiesType`,
    // baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  const instance = createAxiosInstance(option);
  const res = await instance.get('/');
  return res;
};

export const getHobbyNameFromTypeAPI = async (hobbyType: string) => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}getHobbyNameFromType/${hobbyType}`,
    // baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  const instance = createAxiosInstance(option);
  const res = await instance.get('/');
  return res;
};
