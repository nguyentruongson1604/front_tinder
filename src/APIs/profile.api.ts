import axios, {AxiosRequestConfig} from 'axios';

export interface IProfile {
  _id?: string;
  user?: any;
  hobby?: [any];
  title?: string;
  description?: string;
  photos?: [string];
  age?: number;
  adress?: string;
  location: any;
}
export const createProfileAPI = async (profile: IProfile) => {
  const option: AxiosRequestConfig = {
    method: 'POST',
    url: 'http://localhost:3031/api/createProfile',
    // url: 'http://192.168.55.112:3031/api/createProfile',
    data: profile,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  return await axios(option);
};

export const updateMyProfileAPI = async (profile?: IProfile) => {
  const option: AxiosRequestConfig = {
    method: 'POST',
    url: 'http://localhost:3031/api/updateProfile',
    // url: 'http://192.168.55.112:3031/api/updateProfile',
    data: profile,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  return await axios(option);
};

export const getRandomProfileAPI = async () => {
  const option: AxiosRequestConfig = {
    method: 'GET',
    url: 'http://localhost:3031/api/getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  return await axios(option);
};

export const getRandom10ProfileAPI = async () => {
  const option: AxiosRequestConfig = {
    method: 'GET',
    url: 'http://localhost:3031/api/getRandom10ProfileAPI',
    // url: 'http://192.168.55.112:3031/api/getRandom10ProfileAPI',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  return await axios(option);
};

export const getMyProfileAPI = async () => {
  const option: AxiosRequestConfig = {
    method: 'GET',
    url: 'http://localhost:3031/api/getMyProfile',
    // url: 'http://192.168.55.112:3031/api/getMyProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  return await axios(option);
};
