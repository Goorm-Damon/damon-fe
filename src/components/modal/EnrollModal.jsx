import React, { useEffect, useState } from 'react'
import styles from './EnrollModal.module.scss'
import { useRecoilState } from 'recoil';
import { calendarInfoState } from '../../states/calendar/calendarInfoState';

const EnrollModal = ({ setModalOpen, placeInfo, setPlaceInfo, setSearchMarkers, searchMarkers }) => {
  const [calenderInfo, setCalenderInfo] = useRecoilState(calendarInfoState);

  const [memo, setMemo] = useState("");

  const onChange = (e) => {
    setMemo(e.target.value);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 마커 초기화 함수
  const clearMarkers = () => {
    searchMarkers.forEach(marker => marker.setMap(null)); // 모든 마커 제거
    setSearchMarkers([]); // 마커 배열 초기화
  };

  useEffect(() => {
    setPlaceInfo(prevPlaceInfo => ({
      ...prevPlaceInfo,
      memo: memo
    }));
    console.log(setPlaceInfo);
  }, [memo])


  const handleAddClaneder = () => {
    // setPlaceInfo(prevPlaceInfo => ({
    //   ...prevPlaceInfo,
    //   memo: memo
    // }));
    alert("일정에 추가되었습니다.");
    clearMarkers();
    setModalOpen(false);

    setCalenderInfo((prev) => ({
      ...prev,
      travels: [...prev.travels, placeInfo]
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.modalBlock}>
          <div className={styles.content}>
            <p>{placeInfo.locationName}</p>
            <div>
              <input
                placeholder='메모를 입력해주세요'
                onChange={onChange}
                value={memo}
              />
            </div>
            <div>
              <button className={styles.close_btn} onClick={closeModal}>
                취소
              </button>
              <button className={styles.enroll_btn} onClick={handleAddClaneder}>
                추가
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollModal;