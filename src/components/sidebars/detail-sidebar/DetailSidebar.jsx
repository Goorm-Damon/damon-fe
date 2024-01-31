import React, { useEffect, useState } from 'react'
import styles from './DetailSidebar.module.scss'
import CreateDays from '../../calendar/create-days/CreateDays'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { clickedDateState, computeDateState, filteredTravelsSelector } from '../../../states/calendar/calendarInfoState';
import ShowCalendar from '../../calendar/show-calendar/ShowCalendar';
import { headerState } from '../../../states/header/headerState';
import * as calendarService from '../../../apis/services/calendarService';


const DetailSidebar = ({ showModal, places, setSearchPlace }) => {

  const clickedDate = useRecoilValue(clickedDateState);
  const computeDate = useRecoilValue(computeDateState);
  const clickedDay = useState(0);
  const [inputText, setInputText] = useState("");
  const [placeInfo, setPlaceInfo] = useState({});


  // 일정 추가,일정보기 상태 변수
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
  const [isViewButtonClicked, setIsViewButtonClicked] = useState(true);
  const [calendars, setCalendars] = useState([]);

  const filteredTravels = useRecoilValue(filteredTravelsSelector);
  const setFilteredTravels = useSetRecoilState(filteredTravelsSelector);
  const [headerSettings, setHeaderSettings] = useRecoilState(headerState);
  const { showDefalut, showFeatures, showDetail, showModify } = headerSettings;

  // 버튼 스타일을 결정하는 함수
  const addButtonStyle = isAddButtonClicked ? { color: '#5376C6' } : {};
  const viewButtonStyle = isViewButtonClicked ? { color: '#5376C6' } : {};

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPlace(inputText);
    setInputText("");
  };

  const handleAddButtonClick = () => {
    setIsAddButtonClicked(true);
    setIsViewButtonClicked(false); // "일정 보기" 버튼 상태 초기화
    // 기타 필요한 로직 추가
  };

  const handleViewButtonClick = () => {
    setIsViewButtonClicked(true);
    setIsAddButtonClicked(false); // "일정 추가" 버튼 상태 초기화
    // 기타 필요한 로직 추가
  };

  const handleModal = (item) => {
    setPlaceInfo({
      ...placeInfo,
      locationName: item.place_name,
      latitude: item.x,
      longitude: item.y,
      day: clickedDate,
      
    })
    showModal();
  }

  return (
    <div className={styles.container}>
      <section className={styles.selecDay}>
        <div className={styles.dayContainer}>
          {[...Array(parseInt(computeDate + 1))].map((n, index) => {
            return <CreateDays key={index + 1} index={index} />
          })}
        </div>
      </section>
      <section className={styles.funcSide}>
        <div className={styles.addShow__btn}>
          {showModify &&
            <div style={{ display: 'flex' }}>
              <button style={addButtonStyle} onClick={handleAddButtonClick}>
                일정 추가
              </button>
              <p>/</p>
            </div>
          }
          <div div style={{ display: 'flex' }}>
            <button style={viewButtonStyle} className={styles.viewBtn} onClick={handleViewButtonClick}>
              일정 보기
            </button>
            <p style={{visibility: 'hidden'}}>/</p>
          </div>

        </div>
        {isAddButtonClicked ?
          <div>
            <div>
              <form className="inputForm" onSubmit={handleSubmit}>
                <input
                  placeholder="장소 검색"
                  onChange={onChange}
                  value={inputText}
                  name='inputText'
                />
                {/* <button type="submit">검색</button> */}
              </form>
            </div>
            <div id="result-list" className={styles.result_list}
            >
              {places.map((item, i) => (
                <div key={i}
                  onClick={(e) => handleModal(item, e)}
                  className={styles.place__container}
                >
                  <div>
                    <p>{item.place_name}</p>
                    {item.road_address_name ? (
                      <div>
                        <p>{item.road_address_name}</p>
                        <p>{item.address_name}</p>
                      </div>
                    ) : (
                      <p>{item.address_name}</p>
                    )}
                    <p>{item.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> :
          <div className={styles.Calendar__Container}>
            {filteredTravels && filteredTravels.map((calendar, index) => {
              return <ShowCalendar key={index} calendar={calendar} />
            })}
            {filteredTravels && filteredTravels.length === 0 &&
              <div className={styles.no_calendar}>
                <p>일정이 없습니다. 추가해 보세요.</p>
              </div>
            }
          </div>
        }
      </section>
    </div>
  )
}

export default DetailSidebar