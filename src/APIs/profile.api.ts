import axios, {AxiosRequestConfig} from 'axios';
import {axiosInstanceOptions, createAxiosInstance} from '../instance/instances';

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
    url: 'http://192.168.100.57:3031/api/createProfile',
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
    url: 'http://192.168.100.57:3031/api/updateProfile',
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
  const option: axiosInstanceOptions = {
    baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
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

export const getRandom10ProfileAPI = async () => {
  const option: axiosInstanceOptions = {
    // method: 'GET',
    baseURL: 'http://localhost:3031/api/getRandom10Profile',
    // url: 'http://192.168.55.112:3031/api/getRandom10Profile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  // return await createAxiosInstance(option);
  const instance = createAxiosInstance(option);
  const res = await instance.get('/');
  // console.log('upload result: ', res)
  return res;
};

// export const getRandom10ProfileAPI = async () => {
//   const option: AxiosRequestConfig = {
//     method: 'GET',
//     url: 'http://localhost:3031/api/getRandom10Profile',
//     // url: 'http://192.168.55.112:3031/api/getRandomProfile',
//     headers: {
//       accept: 'application/json',
//       'content-type': 'application/json',
//     },
//   };
//   return await axios(option);
// };

// export async function uploadImageBook(bookId: string, image: File) {
//   try {
//     const formData = new FormData();
//     formData.append('image', image);
//     const options: axiosInstanceOptions = {
//       baseURL: `/api/v1/book/${bookId}/upload`,
//       headers: {
//         'Content-Type': 'image/JPG',
//       },
//     };
//     const instance = createAxiosInstance(options);
//     const res = await instance.post('/', formData);
//     // console.log('upload result: ', res)
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// }

export const getMyProfileAPI = async () => {
  const option: AxiosRequestConfig = {
    method: 'GET',
    url: 'http://192.168.100.57:3031/api/getMyProfile',
    // url: 'http://192.168.55.112:3031/api/getMyProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  return await axios(option);
};
