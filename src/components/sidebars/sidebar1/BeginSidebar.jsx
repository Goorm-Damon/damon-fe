import React, { useState } from 'react'
import styles from './BeginSidebar.module.scss'
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useRecoilState } from 'recoil';
import { calendarInfoState, showCreateState } from '../../../states/calendar/calendarInfoState';
import { useNavigate } from 'react-router-dom';

const areas = [
  { value: '가평', label: "가평" },
  { value: '강원', label: "강원" },
  { value: '경기/인천', label: "경기/인천" },
  { value: '서울', label: "서울" },
  { value: '충청', label: "충청" },
  { value: '경상', label: "경상" },
  { value: '전라', label: "전라" },
  { value: '제주', label: "제주" },
];

const BeginSidebar = ({ onSwitch }) => {
  const [title, setTitle] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [area, setArea] = useState("");
  const [numberDay, setNumberDay] = useState(0);

  const [calenderInfo, setCalenderInfo] = useRecoilState(calendarInfoState);
  const [showCreate, setShowCreate] = useRecoilState(showCreateState);


  const navigate = useNavigate();

  // const handleConfirmAndSwitch = () => {
  //   handleConfirm();
  //   navigate('/register/calender/step2')
  // };



  const handleConfirm = () => {

    setCalenderInfo((prev) => ({
      ...prev,
      title: title,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
      area: area.value,
    }));

    setShowCreate(!showCreate);
  }

  return (
    <div className={styles.container}>
      <section>
        <div>
          <p>제목 <span>*필수 입력사항입니다.</span></p>
          <input
            name='title'
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력해주세요'
          />
        </div>
        <div className={styles.regions}>
          <p>지역 카테고리 <span>*필수 입력사항입니다.</span></p>
          <Select
            onChange={(e) => setArea(e)}
            placeholder="지역을 선택해주세요"
            options={areas}
          />
        </div>
        <div className={styles.dates}>
          <p>여행기간 <span>*필수 입력사항입니다.</span></p>
          <div className={styles.date_content}>
            <DatePicker
              mode={"date"}
              dateFormat="yyyy-MM-dd"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              // isClearable={true}
              onFocus={e => e.target.blur()}
            />
          </div>
        </div>
        <div className={styles.btn}>
          <button className={styles.write_btn} onClick={handleConfirm}
            disabled={!title || !area || !startDate || !endDate}
          >
            상세 일정 등록
          </button>

        </div>
      </section>
    </div>
  )
}

export default BeginSidebar