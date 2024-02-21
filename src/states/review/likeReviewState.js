import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const likedReviewState = atom({
  key: 'likedReviewState', // 고유한 key
  default: [], // 기본값은 빈 배열

  effects_UNSTABLE: [persistAtom],
});