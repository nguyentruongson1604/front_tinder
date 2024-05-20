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
  location?: any;
}
export const createProfileAPI = async (profile: IProfile) => {
  const option: axiosInstanceOptions = {
    baseURL: 'http://192.168.100.57:3031/api/createProfile',
    // baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
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
    baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
    // baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
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
    baseURL: 'http://192.168.100.57:3031/api/getRandom10Profile',
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
    baseURL: 'http://192.168.100.57:3031/api/getMyProfile',
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

export const getListMatchAPI = async () => {
  const option: axiosInstanceOptions = {
    // method: 'GET',
    baseURL: 'http://192.168.100.57:3031/api/getListMatch',
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
    baseURL: 'http://192.168.100.57:3031/api/updateProfile',
    // baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
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
    baseURL: 'http://192.168.100.57:3031/api/cloudinary-upload',
    // baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
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
    baseURL: 'http://192.168.100.57:3031/api/checkExistProfile',
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

export const updateListMatchAPI = async (otherUser: string) => {
  const option: axiosInstanceOptions = {
    baseURL: 'http://192.168.100.57:3031/api/updateListMatch',
    // baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
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
