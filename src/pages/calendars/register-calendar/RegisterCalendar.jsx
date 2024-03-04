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

const region_latlon = {
  'GAPYEONG': { latitude: '37.8312', longitude: '127.5104' },
  'GANGWON': { latitude: '37.8787', longitude: '127.7435' },
  'GEYONGGI': { latitude: '37.2891', longitude: '127.0530' },
  'INCHEON': { latitude: '37.4571', longitude: '126.7051' },
  'SEOUL': { latitude: '37.5522', longitude: '126.9913' },
  'CHUNGCHEONG': { latitude: '36.5408', longitude: '126.9603' },
  'GYEONGSANG': { latitude: '35.1552', longitude: '129.0551' },
  'JEOLLLA': { latitude: '35.8196', longitude: '127.1169' },
  'JEJU': { latitude: '33.4805', longitude: '126.5374' },
};

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
    const centerCoord = placeLatLon.length > 0
    ? new kakao.maps.LatLng(placeLatLon[0].latitude, placeLatLon[0].longitude)
    : (region_latlon[calendarInfo.area]
      ? new kakao.maps.LatLng(region_latlon[calendarInfo.area].latitude, region_latlon[calendarInfo.area].longitude)
      : new kakao.maps.LatLng(37.5665, 126.9780)); // 기본 좌표 (예: 서울 시청)

    const mapOptions = {
      center: centerCoord,
      level: 5,
    };

    const map = new kakao.maps.Map(mapContainer, mapOptions);

    // 장소 검색 객체를 생성
    const ps = new kakao.maps.services.Places();

    const mapLine = () => {
      if (placeLatLon.length) {
        let bounds = new kakao.maps.LatLngBounds();

        placeLatLon.forEach(latlon => {
          displayMarker(latlon, true); // 기본 마커
          bounds.extend(new kakao.maps.LatLng(latlon.latitude, latlon.longitude));
        });
        map.setBounds(bounds);
      }
    };


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

    if (placeLatLon) {
      mapLine();
    }

    // 이미 등록된 일정에 대한 마커를 표시
    placeLatLon.forEach(travel => {
      displayMarker(travel, true); // 등록된 일정 마커
    });

    
    // 선을 구성하는 좌표 배열 생성
    const linePath = placeLatLon.map(latLon => new kakao.maps.LatLng(latLon.latitude, latLon.longitude));

    // 지도에 표시할 선을 생성합니다
    const polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표 배열
      strokeWeight: 5, // 선의 두께
      strokeColor: '#FFAE00', // 선의 색깔
      strokeOpacity: 0.7, // 선의 불투명도
      strokeStyle: 'solid' // 선의 스타일
    });

    // 지도에 선을 표시합니다
    polyline.setMap(map);

    // 키워드로 장소를 검색
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB);
    }
  }, [searchPlace, calendarInfo, clickedDate, placeLatLon]);


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