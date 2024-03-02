import React, { useEffect, useState } from 'react'
import styles from './DetailCalendar.module.scss'
import { useLocation } from 'react-router-dom'
import * as calendarService from '../../../apis/services/calendarService';
import DetailSidebar from '../../../components/sidebars/detail-sidebar/DetailSidebar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { calendarInfoState, clickedDateState, placeLatLonState } from '../../../states/calendar/calendarInfoState';
import EnrollModal from '../../../components/modal/EnrollModal';
import AddPlace from '../../../components/sidebars/sidebar2/add-place/AddPlace';
import { headerState } from '../../../states/header/headerState';

const { kakao } = window;

const region_latlon = {
  'GAPYEONG': { latitude: '37.8186', longitude: '127.4505' },
  'GANGWON': { latitude: '37.8238', longitude: '128.1563' },
  'GEYONGGI': { latitude: '37.4139', longitude: '127.5184' },
  'INCHEON': { latitude: '37.4571', longitude: '126.7051' },
  'SEOUL': { latitude: '37.5522', longitude: '126.9913' },
  'CHUNGCHEONG': { latitude: '36.5408', longitude: '126.9603' },
  'GYEONGSANG': { latitude: '35.1552', longitude: '129.0551' },
  'JEOLLLA': { latitude: '35.4050', longitude: '127.1128' },
  'JEJU': { latitude: '33.4805', longitude: '126.5374' },
};

const DetailCalendar = () => {

  const calendarId = useLocation().state.calendarId;
  const [calenderInfo, setCalenderInfo] = useRecoilState(calendarInfoState);
  const [searchPlace, setSearchPlace] = useState("");
  const [places, setPlaces] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchMarkers, setSearchMarkers] = useState([]);
  const [headerSettings, setHeaderSettings] = useRecoilState(headerState);
  const { showDefalut, showFeatures, showDetail, showModify } = headerSettings;
  const [markers, setMarkers] = useState([]);
  const clickedDate = useRecoilValue(clickedDateState);
  const placeLatLon = useRecoilValue(placeLatLonState);
  const [placeInfo, setPlaceInfo] = useState({
    travelId: null,
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setPlaces([]); // places 초기화
    setSearchPlace("");
  }, [clickedDate, placeLatLon]);


  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOptions = {
      center: placeLatLon.length > 0
        ? new kakao.maps.LatLng(placeLatLon[0].latitude, placeLatLon[0].longitude) // 첫 번째 좌표로 중심 설정
        : new kakao.maps.LatLng(33.450701, 126.570667), // 기본 중심 좌표
      level: 5,
    };

    const map = new kakao.maps.Map(mapContainer, mapOptions);

    // 장소 검색 객체를 생성
    const ps = new kakao.maps.services.Places();

    const placesSearchCB = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
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
        setSearchMarkers(prev => [...prev, marker]);

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
  }, [searchPlace, calenderInfo, clickedDate]);


  return (
    <div className={styles.register__container}>
      {modalOpen && <EnrollModal setModalOpen={setModalOpen} setPlaceInfo={setPlaceInfo} placeInfo={placeInfo} setSearchMarkers={setSearchMarkers} searchMarkers={searchMarkers} setPlaces={setPlaces} />}
      <div id="map" style={{
        width: '80%',
        height: '100vh',
        float: 'right'
      }}>
      </div>
      <div className={styles.register__sidebars}>
      <DetailSidebar showModal={showModal} places={places} setSearchPlace={setSearchPlace} setPlaceInfo={setPlaceInfo} placeInfo={placeInfo} />
      {showModify && 
      <AddPlace setSearchPlace={setSearchPlace} places={places} setPlaceInfo={setPlaceInfo} placeInfo={placeInfo} showModal={showModal} setModalOpen={setModalOpen}/>
      }
      </div>
    </div>

  )
}

export default DetailCalendar