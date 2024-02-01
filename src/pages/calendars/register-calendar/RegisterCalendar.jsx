import React, { useEffect, useState } from 'react'
import BeginSidebar from '../../../components/sidebars/sidebar1/BeginSidebar';
import CreateSidebar from '../../../components/sidebars/sidebar2/CreateSidebar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { headerState } from '../../../states/header/headerState';
import { showCreateState } from '../../../states/calendar/calendarInfoState';
import EnrollModal from '../../../components/modal/EnrollModal';


const { kakao } = window;

const regions = [
  { value: '가평', label: "가평" },
  { value: '강원', label: "강원" },
  { value: '경기/인천', label: "경기/인천" },
  { value: '서울', label: "서울" },
  { value: '충청', label: "충청" },
  { value: '경상', label: "경상" },
  { value: '전라', label: "전라" },
  { value: '제주', label: "제주" },
];

const RegisterCalendar = () => {

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [region, setRegion] = useState("");
  const [numberDay, setNumberDay] = useState(0);
  const [searchPlace, setSearchPlace] = useState("");
  const [places, setPlaces] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [placeInfo,setPlaceInfo] = useState({
    locationName: '',
    latitude: '',
    longitude:'',
    memo: '',
    orderNum: 0,
  })
  

  const [headerSettings, setHeaderSettings] = useRecoilState(headerState);
  const { showDefalut, showFeatures } = headerSettings;
  const showCreate = useRecoilValue(showCreateState);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

  const switchSidebar = () => {
    setHeaderSettings({ showDefalut: false, showFeatures: true});
  };


  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    const mapCotainer = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new kakao.maps.Map(mapCotainer, options);
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        // displayPagination(pagination)
        setPlaces(data)
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:2px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }
  }, [searchPlace]);

  return (
    <div>
      {modalOpen && <EnrollModal  setModalOpen={setModalOpen} setPlaceInfo={setPlaceInfo} placeInfo={placeInfo}/>}
      {!showCreate ? 
      <BeginSidebar onSwitch={switchSidebar} /> : 
      <CreateSidebar setSearchPlace={setSearchPlace} places={places} showModal={showModal} setModalOpen={setModalOpen} setPlaceInfo={setPlaceInfo} placeInfo={placeInfo}/>}

      <div id="map" style={{
        // width: '1000px',
        height: '100vh'
      }}>
      </div>
    </div>
  )
}

export default RegisterCalendar