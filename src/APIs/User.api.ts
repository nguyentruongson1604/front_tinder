import axios, {AxiosRequestConfig} from 'axios';

export const registerAPI = async (account: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const option: AxiosRequestConfig = {
    method: 'POST',
    url: 'http://localhost:3031/api/register',
    data: account,
    // headers: {
    //   accept: 'application/json',
    // },
  };
  return await axios(option);
};

export const loginAPI = async (account: {email: string; password: string}) => {
  const option: AxiosRequestConfig = {
    method: 'POST',
    url: 'http://localhost:3031/api/login',
    data: account,
    // headers: {
    //   accept: 'application/json',
    // },
  };
  return await axios(option);
};
