import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const calendarInfoState = atom({
  key: "calendarInfo",
  default: {
    title: "",
    startDate: "",
    endDate: "",
    area: "",
    travels: []
  },
  effects_UNSTABLE: [persistAtom],
})


export const computeDateState = selector({
  key: "computeDate",
  get: ({ get }) => {
    const calendarInfo = get(calendarInfoState);
    let startDate = calendarInfo.startDate;
    let endDate = calendarInfo.endDate;

    // startDate와 endDate가 문자열이라면 Date 객체로 변환
    if (typeof startDate === 'string') {
      startDate = new Date(startDate);
    }
    if (typeof endDate === 'string') {
      endDate = new Date(endDate);
    }

    // startDate와 endDate가 유효한 Date 객체인지 확인
    if (startDate instanceof Date && endDate instanceof Date && 
        !isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      let elapsedMSec = endDate.getTime() - startDate.getTime();
      const elapsedDay = Math.ceil(elapsedMSec / (1000 * 60 * 60 * 24));
      return elapsedDay;
    }

    return 0; // 유효하지 않은 경우, 0을 반환
  },
  effects_UNSTABLE: [persistAtom],
});


export const filteredTravelsSelector = selector({
  key: "filteredTravels",
  get: ({ get }) => {
    const calendarInfo = get(calendarInfoState);
    const clickedDate = get(clickedDateState);

    // calendarInfo.travels에서 orderNum이 clickedDate와 일치하는 항목들을 필터링
    return calendarInfo.travels.filter(travel => travel.orderNum === clickedDate);
  }
});


export const clickedDateState = atom({
  key: "clickedDate",
  default: 1,
  effects_UNSTABLE: [persistAtom],
})
export const showCreateState = atom({
  key: "showCreate",
  default: false,
  effects_UNSTABLE: [persistAtom],
})