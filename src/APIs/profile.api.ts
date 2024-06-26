import {axiosInstanceOptions, createAxiosInstance} from '../instance/instances';
import {ILocation} from '../store/domain/ProfileStore';
import {ipAdressAdroid} from './activity.api';

export interface IProfile {
  _id?: string;
  user?: any;
  hobby?: [any];
  title?: string;
  description?: string;
  photos?: [string];
  age?: number;
  adress?: string;
  location?: any;
}
export const createProfileAPI = async (profile: IProfile) => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}createProfile`,
    // baseURL: `${ipAdressAdroid}getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    // data: idArray,
  };
  const instance = createAxiosInstance(option);
  const res = await instance.post('', profile);
  return res;
};

// export const updateMyProfileAPI = async (profile?: IProfile) => {
//   const option: AxiosRequestConfig = {
//     method: 'POST',
//     url: 'http://192.168.100.57:3031/api/updateProfile',
//     // url: 'http://192.168.100.57:3031/api/updateProfile',
//     // url: 'http://192.168.55.112:3031/api/updateProfile',
//     data: profile,
//     headers: {
//       accept: 'application/json',
//       'content-type': 'application/json',
//     },
//   };
//   return await axios(option);
// };

export const getRandomProfileAPI = async (idArray: string[]) => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}getRandomProfile`,
    // baseURL: `${ipAdressAdroid}getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    // data: idArray,
  };
  const instance = createAxiosInstance(option);
  const res = await instance.post('', {idArray}); //phải dùng {} vì idArray là 1 mảng nhưng gửi req cần 1 Object
  return res;
};

export const getRandom10ProfileAPI = async () => {
  const option: axiosInstanceOptions = {
    // method: 'GET',
    baseURL: `${ipAdressAdroid}getRandom10Profile`,
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

export const getMyProfileAPI = async () => {
  const option: axiosInstanceOptions = {
    // method: 'GET',
    baseURL: `${ipAdressAdroid}getMyProfile`,
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

export const getOtherProfileAPI = async (data: {user: string}) => {
  const option: axiosInstanceOptions = {
    // method: 'GET',
    baseURL: `${ipAdressAdroid}getOtherProfile`,
    // url: 'http://192.168.55.112:3031/api/getRandom10Profile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  // return await createAxiosInstance(option);
  const instance = createAxiosInstance(option);
  const res = await instance.post('', data);
  // console.log('upload result: ', res)
  return res;
};

export const getListMatchAPI = async () => {
  const option: axiosInstanceOptions = {
    // method: 'GET',
    baseURL: `${ipAdressAdroid}getListMatch`,
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

export const getListMatchWithoutArrangeAPI = async () => {
  const option: axiosInstanceOptions = {
    // method: 'GET',
    baseURL: `${ipAdressAdroid}getListMatchWithoutArrange`,
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

export const updateMyProfileAPI = async (profile: IProfile) => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}updateProfile`,
    // baseURL: `${ipAdressAdroid}getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    // data: idArray,
  };
  const instance = createAxiosInstance(option);
  const res = await instance.put('', profile); //phải dùng {} vì idArray là 1 mảng nhưng gửi req cần 1 Object
  return res;
};

export const uploadImageAPI = async (formData: any) => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}cloudinary-upload`,
    // baseURL: `${ipAdressAdroid}getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    // data: idArray,
  };
  const instance = createAxiosInstance(option);
  const res = await instance.post('', formData); //phải dùng {} vì idArray là 1 mảng nhưng gửi req cần 1 Object
  return res;
};

export const checkExistProfileAPI = async () => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}checkExistProfile`,
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

export const updateLocationAPI = async (location: ILocation) => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}updateLocation`,
    // baseURL: `${ipAdressAdroid}getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    // data: idArray,
  };
  const instance = createAxiosInstance(option);
  const res = await instance.put('', location); //phải dùng {} vì idArray là 1 mảng nhưng gửi req cần 1 Object
  return res;
};

export const updateListMatchAPI = async (otherUser: {
  userId: string;
  profileId: string;
}) => {
  const option: axiosInstanceOptions = {
    baseURL: `${ipAdressAdroid}updateListMatch`,
    // baseURL: `${ipAdressAdroid}getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    // data: idArray,
  };
  const instance = createAxiosInstance(option);
  const res = await instance.put('', otherUser); //phải dùng {} vì idArray là 1 mảng nhưng gửi req cần 1 Object
  return res;
};
// export const getRandom10ProfileAPI = async () => {
//   const option: AxiosRequestConfig = {
//     method: 'GET',
//     url: 'http://192.168.100.57:3031/api/getRandom10Profile',
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
