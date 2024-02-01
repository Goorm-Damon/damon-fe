import React, { useEffect, useState } from 'react'
import styles from './CreateSidebar.module.scss'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { calendarInfoState, clickedDateState, computeDateState, filteredTravelsSelector } from '../../../states/calendar/calendarInfoState';
import CreateDays from './../../calendar/create-days/CreateDays';
import ShowCalendar from '../../calendar/show-calendar/ShowCalendar';

const CreateSidebar = ({ setSearchPlace, places, showModal, setModalOpen, setPlaceInfo, placeInfo }) => {

  const setCalenderInfo = useSetRecoilState(calendarInfoState);
  const calenderInfo = useRecoilValue(calendarInfoState);
  const clickedDate = useRecoilValue(clickedDateState);
  const computeDate = useRecoilValue(computeDateState);
  const clickedDay = useState(0);
  const [inputText, setInputText] = useState("");

  // 일정 추가,일정보기 상태 변수
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(true);
  const [isViewButtonClicked, setIsViewButtonClicked] = useState(false);
  const [calendars, setCalendars] = useState([]);

  const filteredTravels = useRecoilValue(filteredTravelsSelector);

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
      orderNum: clickedDate,
    })
    showModal();
  }


  // 버튼 스타일을 결정하는 함수
  const addButtonStyle = isAddButtonClicked ? { color: '#5376C6' } : {};
  const viewButtonStyle = isViewButtonClicked ? { color: '#5376C6' } : {};

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
          <button style={addButtonStyle} onClick={handleAddButtonClick}>
            일정 추가
          </button>
          <p>/</p>
          <button style={viewButtonStyle} onClick={handleViewButtonClick}>
            일정 보기
          </button>

        </div>
        {isAddButtonClicked ?
          <div>
            <div>
              <form className="inputForm" onSubmit={handleSubmit}>
                <input
                  placeholder="장소 검색"
                  onChange={onChange}
                  value={inputText}
                />
                {/* <button type="submit">검색</button> */}
              </form>
            </div>
            <div id="result-list"
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
            {filteredTravels.map((calendar, index) => {
              return <ShowCalendar key={calendar.latitude} calendar={calendar} />
            })}
            {filteredTravels.length == 0 &&
              <div>
                <p>알정이 없습니다.\n 추가해 보세요.</p>
              </div>
            }
          </div>
        }

      </section>
    </div>
  )
}

export default CreateSidebar