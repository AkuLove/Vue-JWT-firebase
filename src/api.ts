import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from './stores/auth';
import { ITokens } from './types/ITokens';
import { INewTokens } from './types/INewTokens';
import router from './router/router';

const axiosApiInstance = axios.create();

const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE;

axiosApiInstance.interceptors.request.use((config) => {
  const url = config.url;
  if (!url?.includes('signInWithPassword') && !url?.includes('signUp')) {
    const authStore = useAuthStore();
    const params = new URLSearchParams();
    params.append('auth', authStore.userInfo.token);
    config.params = params;
  }
  return config;
});

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const authStore = useAuthStore();
    const originalRequest:
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const tokens = localStorage.getItem('userTokens');
        if (tokens) {
          const parsedTokens: ITokens = JSON.parse(tokens);
          const newTokens = await axios.post<INewTokens>(
            `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
            {
              grant_type: 'refresh_token',
              refresh_token: parsedTokens.refreshToken,
            }
          );
          console.log(newTokens);
          authStore.userInfo.token = newTokens.data.access_token;
          authStore.userInfo.refreshToken = newTokens.data.refresh_token;

          localStorage.setItem(
            'userTokens',
            JSON.stringify({
              token: newTokens.data.access_token,
              refreshToken: newTokens.data.refresh_token,
            })
          );
        }
      } catch (err) {
        console.log(err);
        localStorage.removeItem('userTokens');
        router.push('/signin');
        authStore.userInfo.token = '';
        authStore.userInfo.refreshToken = '';
      }
    }
  }
);

export default axiosApiInstance;
