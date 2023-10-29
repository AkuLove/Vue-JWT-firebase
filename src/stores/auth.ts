import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios, { AxiosError } from 'axios';
import { ISignUp } from '../types/ISignUp';
import { ISignUpResponse } from '../types/ISignUpResponse';
import { ISignUpError } from '../types/ISignUpError';

const API_KEY = 'AIzaSyDeXYh-N9ZcysjHx3inkV2zH1OwgaquY-c';

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

  const signUp = async (payload: ISignUp) => {
    errorMessage.value = '';
    loader.value = true;
    try {
      const response = await axios.post<ISignUpResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
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
      loader.value = false;
    } catch (err) {
      const error = err as AxiosError<ISignUpError>;
      switch (error.response?.data.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage.value = 'Email exists';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage.value = 'Operation not allowed';
          break;
        default:
          errorMessage.value = 'Error';
          break;
      }
      loader.value = false;
    }
  };
  return { signUp, userInfo, errorMessage, loader };
});
