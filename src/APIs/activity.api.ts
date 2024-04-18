import {axiosInstanceOptions, createAxiosInstance} from '../instance/instances';

export const updateActivityAPI = async (activityInfo: {
  senderUser: string;
  senderType: string;
  receiverUser: string;
  receiverType: string;
}) => {
  const option: axiosInstanceOptions = {
    baseURL: 'http://192.168.100.57:3031/api/updateActivity',
    // baseURL: 'http://192.168.100.57:3031/api/getRandomProfile',
    // url: 'http://192.168.55.112:3031/api/getRandomProfile',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };
  const instance = createAxiosInstance(option);
  const res = await instance.put('', activityInfo);
  return res;
};
