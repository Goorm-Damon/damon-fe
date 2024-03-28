import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

//리뷰 상태 저장
export const communityInfoState = atom({
  key: "communityInfo",
  default: {
    title: "",
    content: "",
  },
  effects_UNSTABLE: [persistAtom],
})