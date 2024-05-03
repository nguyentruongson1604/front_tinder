import {axiosInstanceOptions, createAxiosInstance} from '../instance/instances';
import {IUpdatePreferences} from '../store/domain/PreferencesStore';

export const createPreferencesAPI = async () => {
  const option: axiosInstanceOptions = {
    baseURL: 'http://192.168.100.57:3031/api/createPreferences',
    // baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    // data: idArray,
  };
  const instance = createAxiosInstance(option);
  const res = await instance.post('');
  return res;
};

export const updatePreferencesAPI = async (preference: IUpdatePreferences) => {
  const option: axiosInstanceOptions = {
    baseURL: 'http://192.168.100.57:3031/api/updatePreferences',
    // baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    // data: idArray,
  };
  const instance = createAxiosInstance(option);
  const res = await instance.put('', preference);
  return res;
};
