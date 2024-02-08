import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: null,
});

export const isLoadingState = atom({
  key: 'isLoadingState',
  default: true,
});