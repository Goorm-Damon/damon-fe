import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { headerState } from '../../states/header/headerState';
import "react-datepicker/dist/react-datepicker.module.css"
import { calendarInfoState, showCreateState } from '../../states/calendar/calendarInfoState';
import * as calendarService from '../../apis/services/calendarService';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [headerSettings, setHeaderSettings] = useRecoilState(headerState);
  const { showDefalut, showFeatures } = headerSettings;
  const [isHovered, setIsHovered] = useState(false);
  const [showCreate, setShowCreate] = useRecoilState(showCreateState);
  const resetCalender = useResetRecoilState(calendarInfoState);
  const calenderInfo = useRecoilValue(calendarInfoState);


  const handleCancel = () => {
    setShowCreate(false);
    resetCalender();
    navigate('/main');
    setIsHovered(false);
  }

  // 페이지 이동을 위한 함수
  const navigateTo = (path) => () => {
    navigate(path);
  };

  // 현재 경로에 따라 헤더 상태 업데이트
  useEffect(() => {
    if (location.pathname.includes('/register')) {
      setHeaderSettings({ showDefalut: false, showFeatures: true });

    } else {
      setHeaderSettings({ showDefalut: true, showFeatures: false });
    }
  }, [location, setHeaderSettings]);

  const handleSubmit = async () => {
    try {
      const response = await calendarService.createCalendar(calenderInfo);
      if (response.success) {
        alert("일정 등록되었습니다.");
        console.log("response",response);
        //상세일정 페이지로 이동해야함.
      } else {
        console.error(response.error);
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  return (
    <section className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header_logo} onClick={handleCancel}>
          DAMON
        </div>
        {showDefalut &&
          <div className={styles.header__content}>
            <nav className={styles.header__nav}>
              <ul className={styles.gnb}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <li className={styles.header__menu} onClick={navigateTo('/review')}>전체 리뷰</li>
                <li className={styles.header__menu} onClick={navigateTo('/community')}>커뮤니티</li>
                <li className={styles.header__menu2}>등록
                  <ul className={isHovered ? styles.subVisible : styles.sub}>
                    <li onClick={navigateTo('/register/review')}>리뷰 등록</li>
                    <li onClick={navigateTo('/register/calender')}>일정 등록</li>
                    <li onClick={navigateTo('/register/post')}>게시글 등록</li>
                  </ul>
                </li>
                <li className={styles.header__menu2}>마이룸
                  <ul className={isHovered ? styles.subVisible : styles.sub}>
                    <li onClick={navigateTo('/my/reviews')}>내 리뷰</li>
                    <li onClick={navigateTo('/my/calendar')}>내 일정</li>
                    <li onClick={navigateTo('/my/community')}>내 커뮤니티</li>
                  </ul>
                </li>
              </ul>
            </nav>
            <div onClick={navigateTo('/')} className={styles.header__logout}>로그아웃</div>
          </div>
        }
        {showFeatures &&
          <div className={styles.header__btns}>
            <button className={styles.cancel_btn} onClick={handleCancel}>취소</button>
            {showCreate && <button className={styles.confirm_btn} onClick={handleSubmit}>등록</button>}
          </div>
        }

      </div>
      {showDefalut && <div className={isHovered ? styles.nav__backgroundVisible : styles.nav__background}></div>}
    </section>
  )
}

export default Header