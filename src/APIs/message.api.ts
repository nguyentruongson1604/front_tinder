import {axiosInstanceOptions, createAxiosInstance} from '../instance/instances';
import {ipAdressAdroid} from './activity.api';

interface IMessage {
  sender?: string;
  recipient: string;
  content: string;
}
export const createMessageAPI = async (message: IMessage) => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}createMessage`,
    // baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    // data: idArray,
  };
  const instance = createAxiosInstance(option);
  const res = await instance.post('', message);
  return res;
};

export const getMessageAPI = async (condition: {
  recipient: string;
  skipCount: number;
}) => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}getMessage`,
    // baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    // data: idArray,
  };
  const instance = createAxiosInstance(option);
  const res = await instance.post('', condition);
  return res;
};
