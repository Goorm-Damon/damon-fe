import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as calendarService from '../../../apis/services/calendarService';
import DetailSidebar from '../../../components/sidebars/detail-sidebar/DetailSidebar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { calendarInfoState, clickedDateState, placeLatLonState } from '../../../states/calendar/calendarInfoState';
import EnrollModal from '../../../components/modal/EnrollModal';

const { kakao } = window;

const region_latlon = {
  'GAPYEONG': {latitude:'37.8186' ,longitude:'127.4505'},
  'GANGWON': {latitude:'37.8238' ,longitude:'128.1563'},
  'GEYONGGI': {latitude:'37.4139' ,longitude:'127.5184'},
  'INCHEON': {latitude:'37.4571' ,longitude:'126.7051'},
  'SEOUL': {latitude:'37.5522' ,longitude:'126.9913'},
  'CHUNGCHEONG': {latitude:'36.5408' ,longitude:'126.9603'},
  'GYEONGSANG': {latitude:'35.1552' ,longitude:'129.0551'},
  'JEOLLLA': {latitude:'35.4050' ,longitude:'127.1128'},
  'JEJU': {latitude:'33.4805' ,longitude:'126.5374'},
};

const DetailCalendar = () => {

  const calendarId = useLocation().state.id;
  const [calenderInfo, setCalenderInfo] = useRecoilState(calendarInfoState);
  const [searchPlace, setSearchPlace] = useState("");
  const [places, setPlaces] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [markers, setMarkers] = useState([]);
  const clickedDate = useRecoilValue(clickedDateState);
  const [placeInfo, setPlaceInfo] = useState({
    calendarId: null,
    day: null,
    locationName: '',
    latitude: '',
    longitude: '',
    memo: '',
    deleted: false,
  })



  useEffect(() => {
    fetchCalendars();
  }, []);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  const fetchCalendars = async () => {
    try {
      const response = await calendarService.getDetailCalendar(calendarId);
  
      // travels 배열 각 요소에 deleted: false 추가
      const updatedTravels = response.data.travels.map(travel => ({
        ...travel,
        deleted: false,
      }));
  
      setCalenderInfo(prevPlaceInfo => ({
        ...prevPlaceInfo,
        title: response.data.title,
        startDate: response.data.startDate,
        endDate: response.data.endDate,
        area: response.data.area,
        travels: updatedTravels, // 수정된 travels 배열 설정
      }));
    } catch (error) {
      console.log(error);
    }
  }

    // 마커 초기화 함수
    const clearMarkers = () => {
      markers.forEach(marker => marker.setMap(null)); // 모든 마커 제거
      setMarkers([]); // 마커 배열 초기화
    };
  
    useEffect(() => {
      setPlaces([]); // places 초기화
      clearMarkers(); // 마커 초기화
    }, [clickedDate]);


  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOptions = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(mapContainer, mapOptions);

    // 장소 검색 객체를 생성
    const ps = new kakao.maps.services.Places();

    const placesSearchCB = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        clearMarkers(); // 기존 마커 초기화
        let bounds = new kakao.maps.LatLngBounds();

        data.forEach(place => {
          displayMarker(place, false); // 기본 마커
          bounds.extend(new kakao.maps.LatLng(place.y, place.x));
        });

        map.setBounds(bounds);
        setPlaces(data); // 검색된 장소 상태 업데이트
      }
    };

    // 마커를 생성하고 지도에 표시하는 함수
    const displayMarker = (place, isRegistered) => {
      const imageSrc = isRegistered
        ? 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png' // 등록된 일정 마커 이미지
        : null; // 기본 마커 이미지
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = imageSrc ? new kakao.maps.MarkerImage(imageSrc, imageSize) : null;
      if (isRegistered) {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.latitude, place.longitude),
          image: markerImage,
        });
        setMarkers(prev => [...prev, marker]);

      } else {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
          image: markerImage,
        });
        setMarkers(prev => [...prev, marker]);

      }
    };

    // 이미 등록된 일정에 대한 마커를 표시
    calenderInfo.travels.forEach(travel => {
      displayMarker(travel, true); // 등록된 일정 마커
    });

    // 키워드로 장소를 검색
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB);
    }
  }, [searchPlace, calenderInfo]);


  return (
    <div>
      {modalOpen && <EnrollModal setModalOpen={setModalOpen} setPlaceInfo={setPlaceInfo} placeInfo={placeInfo} />}
      <DetailSidebar showModal={showModal} places={places} setSearchPlace={setSearchPlace}/>

      <div id="map" style={{
        height: '100vh'
      }}>
      </div>

    </div>

  )
}

export default DetailCalendar