import { atom } from 'recoil';

export const userState = atom({
  key: 'userState', // 고유한 key 값
  default: { isAuthenticated: false, user: null, token: null }, // 기본값
});