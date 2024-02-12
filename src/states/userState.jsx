import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: null,
});

export const isLoadingState = atom({
  key: 'isLoadingState',
  default: true,
});

export const tokenState = atom({
  key: 'tokenState',
  default: localStorage.getItem('token'), // 토큰 상태의 기본값을 localStorage에서 가져옴
});