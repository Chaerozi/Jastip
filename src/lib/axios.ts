import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000/api/v1';

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('kitorang-auth-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<{ message?: string }>) => {
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('kitorang-auth-token');
          window.location.href = '/login';
        }
      }

      if (error.response?.status === 403) {
        console.error('Access forbidden');
      }

      if (error.response?.status === 500) {
        console.error('Server error');
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const apiClient = createAxiosInstance();

export default apiClient;
