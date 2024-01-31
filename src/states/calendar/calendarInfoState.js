import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist';
import {headerState} from '../header/headerState'

const { persistAtom } = recoilPersist();

//일정 상태 저장
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

//날짜 일수 계산
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

//클릭한 날짜에 맞는 등록된 장소들을 받아옴
export const filteredTravelsSelector = selector({
  key: "filteredTravels",
  get: ({ get }) => {
    const calendarInfo = get(calendarInfoState);
    const clickedDate = get(clickedDateState);
    const headerData = get(headerState);

    // calendarInfo.travels에서 day와 clickedDate가 일치하는 항목들을 필터링
      return calendarInfo.travels.filter(travel => travel.day === clickedDate);
  }
});

//해당 날짜의 등록된 장소들의 위도,경도 정보를 반환
export const placeLatLonState = selector({
  key: "placeLatLon",
  get: ({ get }) => {
    const filteredTravels = get(filteredTravelsSelector);
    const placeLatLon = [];

    // Loop through the filtered travels and store the latitude and longitude
    filteredTravels.forEach(travel => {
      if (travel.latitude && travel.longitude) {
        placeLatLon.push({ latitude: travel.latitude, longitude: travel.longitude });
      }
    });

    return placeLatLon;
  },
});

//선택된 날짜 번호 받아옴
export const clickedDateState = atom({
  key: "clickedDate",
  default: 1,
  effects_UNSTABLE: [persistAtom],
})
//일정 등록 페이지인지 판별(사이드바 2개 중 선택할때 사용)
export const showCreateState = atom({
  key: "showCreate",
  default: false,
  effects_UNSTABLE: [persistAtom],
})

//선택된 일정의 id값 저장
export const getCalendarIdState = atom({
  key: "getCalendarIdState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
})