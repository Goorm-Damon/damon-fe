import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

//리뷰 상태 저장
export const reviewInfoState = atom({
  key: "reviewInfo",
  default: {
    title: "",
    startDate: "",
    endDate: "",
    area: "",
    cost: 0,
    suggests: [],
    freeTags: [],
    content: "",
  },
  effects_UNSTABLE: [persistAtom],
})