import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

export interface axiosInstanceOptions {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}
const refreshAccessToken = async (refreshToken: string) => {
  const options = {
    method: 'post',
    url: '/api/token',
    data: {
      refreshToken: refreshToken,
    },
  };

  const res = await axios(options);
  AsyncStorage.setItem('accessToken', res.data.accessToken);
  AsyncStorage.setItem('refreshToken', res.data.refreshToken);

  return res.data.accessToken;
};

export const createAxiosInstance = (
  options: axiosInstanceOptions,
): AxiosInstance => {
  const instance = axios.create({
    baseURL: options.baseURL,
    timeout: options.timeout || 10000,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  instance.interceptors.request.use(
    async config => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error('Error fetching accessToken', error);
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = AsyncStorage.getItem('refreshToken');

          if (refreshToken) {
            const newAccessToken = await refreshAccessToken(refreshToken);
            if (newAccessToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return instance(originalRequest);
          }
          return instance(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
};
