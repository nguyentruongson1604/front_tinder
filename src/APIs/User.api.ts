import axios, {AxiosRequestConfig} from 'axios';

export const registerAPI = async (account: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const option: AxiosRequestConfig = {
    method: 'POST',
    url: 'http://192.168.100.57:3031/api/register',
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
    // url: 'http://192.168.55.112:3031/api/login',
    data: account,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  return await axios(option);
};
