import React, { useState } from 'react'
import styles from './AddPlace.module.scss'
import { useRecoilState, useRecoilValue } from 'recoil';
import { calendarInfoState, clickedDateState, computeDateState, filteredTravelsSelector } from '../../../../states/calendar/calendarInfoState';

const AddPlace = ({ setSearchPlace, places, showModal, setPlaceInfo, placeInfo }) => {

  const clickedDate = useRecoilValue(clickedDateState);
  const computeDate = useRecoilValue(computeDateState);
  const [inputText, setInputText] = useState("");

  // 일정 추가,일정보기 상태 변수
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(true);
  const [isViewButtonClicked, setIsViewButtonClicked] = useState(false);
  const [calendars, setCalendars] = useState([]);

  const [calendarInfo, setCalendarInfo] = useRecoilState(calendarInfoState);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPlace(inputText);
    setInputText("");
  };

  const handleModal = (item) => {
    setPlaceInfo({
      ...placeInfo,
      locationName: item.place_name,
      latitude: item.y,
      longitude: item.x,
      day: clickedDate,
    })
    showModal();
  }


  return (
    <div className={styles.container}>
      <section className={styles.funcSide}>
        <div className={styles.addShow__btn}>
          일정 추가
        </div>
        <div>
          <div>
            <form className="inputForm" onSubmit={handleSubmit}>
              <input
                placeholder="장소 검색"
                onChange={onChange}
                value={inputText}
                name='inputText'
              />
            </form>
          </div>
          <div id="result-list" className={styles.result_list}
          >
            {places.map((item, i) => (
              <div key={i}
                className={styles.place__container}
                onClick={(e) => handleModal(item, e)}
              >
                <div>
                <p className={styles.place__title}>{item.place_name}</p>
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
      </section>
    </div>
  )
}

export default AddPlace