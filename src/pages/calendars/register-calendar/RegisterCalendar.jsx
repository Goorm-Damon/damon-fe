import React, { useEffect, useState } from 'react'
import BeginSidebar from '../../../components/sidebars/sidebar1/BeginSidebar';
import CreateSidebar from '../../../components/sidebars/sidebar2/CreateSidebar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { headerState } from '../../../states/header/headerState';
import { calendarInfoState, clickedDateState, placeLatLonState, showCreateState } from '../../../states/calendar/calendarInfoState';
import EnrollModal from '../../../components/modal/EnrollModal';
import styles from './RegisterCalendar.module.scss'
import AddPlace from '../../../components/sidebars/sidebar2/add-place/AddPlace';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const { kakao } = window;


const RegisterCalendar = () => {

  const [searchPlace, setSearchPlace] = useState("");
  const [places, setPlaces] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [addSidebarOpen, setAddSidebarOpen] = useState(true);
  const [placeInfo, setPlaceInfo] = useState({
    locationName: '',
    latitude: '',
    longitude: '',
    memo: '',
    day: 0,
    order: 0,
  })

  const [searchMarkers, setSearchMarkers] = useState([]);
  const [markers, setMarkers] = useState([]);


  const calendarInfo = useRecoilValue(calendarInfoState);
  const clickedDate = useRecoilValue(clickedDateState);
  const [headerSettings, setHeaderSettings] = useRecoilState(headerState);
  const { showDefalut, showFeatures } = headerSettings;
  const showCreate = useRecoilValue(showCreateState);
  const placeLatLon = useRecoilValue(placeLatLonState);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  // 장소추가 사이드바
  const showAddSidebar = () => {
    setAddSidebarOpen(!addSidebarOpen);
  };

  const switchSidebar = () => {
    setHeaderSettings({ showDefalut: false, showFeatures: true });
  };

  useEffect(() => {
    setPlaces([]); // places 초기화
    setSearchPlace("");
    console.log(places);
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
      //등록된 장소일때 마커 표시
      if (isRegistered) {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.latitude, place.longitude),
          image: markerImage,
        });
        // setMarkers(prev => [...prev, marker]);
        //검색한 장소에 마커표시
      } else {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
          image: markerImage,
        });
        // setSearchMarkers(prev => [...prev, marker]);

      }
    };

    // 이미 등록된 일정에 대한 마커를 표시
    calendarInfo.travels.forEach(travel => {
      displayMarker(travel, true); // 등록된 일정 마커
    });

    // 키워드로 장소를 검색
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB);
    }
  }, [searchPlace, placeLatLon, clickedDate]);


  return (
    <div className={styles.register__container}>
      {modalOpen && <EnrollModal searchMarkers={searchMarkers} setSearchMarkers={setSearchMarkers} setModalOpen={setModalOpen} setPlaceInfo={setPlaceInfo} placeInfo={placeInfo} setPlaces={setPlaces} />}
      <div id="map" style={{
        width: '80%',
        height: '100vh',
        float: 'right'
      }}>
      </div>
      {!showCreate ?
        <BeginSidebar onSwitch={switchSidebar} /> :
        <div className={styles.register__sidebars}>
          <CreateSidebar setSearchPlace={setSearchPlace} places={places} showModal={showModal} setModalOpen={setModalOpen} setPlaceInfo={setPlaceInfo} placeInfo={placeInfo} />
          {addSidebarOpen ?
            <>
              <AddPlace setSearchPlace={setSearchPlace} places={places} setPlaceInfo={setPlaceInfo} placeInfo={placeInfo} showModal={showModal} setModalOpen={setModalOpen} />
              <div onClick={showAddSidebar} className={styles.sidebar__btn}>
                <IoIosArrowBack />
              </div>
            </>
            :
            <div onClick={showAddSidebar} className={styles.sidebar__btn}>
              <IoIosArrowForward />
            </div>
          }

        </div>
      }
    </div>
  )
}

export default RegisterCalendar