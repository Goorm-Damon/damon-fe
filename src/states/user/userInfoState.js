import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

//일정 상태 저장
export const userInfostate = atom({
  key: "userInfo",
  default: {},
  effects_UNSTABLE: [persistAtom],
})