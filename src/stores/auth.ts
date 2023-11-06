import { ref } from 'vue';
import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { ISignUp } from '../types/ISignUp';
import { ISignUpResponse } from '../types/ISignUpResponse';
import { ISignUpError } from '../types/ISignUpError';
import axiosApiInstance from '../api';

const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE;

export const useAuthStore = defineStore('authStore', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: '',
  });
  const errorMessage = ref('');
  const loader = ref(false);

  const auth = async (
    payload: ISignUp,
    type: 'signUp' | 'signInWithPassword'
  ) => {
    errorMessage.value = '';
    loader.value = true;
    try {
      const response = await axiosApiInstance.post<ISignUpResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${API_KEY}`,
        {
          ...payload,
          returnSecureToken: true,
        }
      );
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      };
      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
        })
      );
    } catch (err) {
      const error = err as AxiosError<ISignUpError>;
      switch (error.response?.data.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage.value = 'Email exists';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage.value = 'Operation not allowed';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage.value = 'Invalid login credentials';
          break;
        case 'USER_DISABLED':
          errorMessage.value = 'User disabled';
          break;
        case 'WEAK_PASSWORD':
          errorMessage.value = 'Password should be at least 6 characters';
          break;
        default:
          errorMessage.value = 'Error';
          break;
      }
      throw errorMessage.value;
    } finally {
      loader.value = false;
    }
  };

  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: '',
      expiresIn: '',
    };
  };
  return { auth, userInfo, errorMessage, loader, logout };
});
