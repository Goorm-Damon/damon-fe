import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const headerState = atom({
  key: 'headerState', // 고유한 키
  default: {
    showDefalut: true,
    showFeatures: false,
    showCreate: false,
  },
  effects_UNSTABLE: [persistAtom],
});
