import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { headerState } from '../../states/header/headerState';
import "react-datepicker/dist/react-datepicker.module.css"
import { calendarInfoState, clickedDateState, getCalendarIdState, showCreateState } from '../../states/calendar/calendarInfoState';
import * as calendarService from '../../apis/services/calendarService';

const getToken = localStorage.getItem('token');

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [headerSettings, setHeaderSettings] = useRecoilState(headerState);
  const { showDefalut, showFeatures, showDetail, showModify } = headerSettings;
  const [isHovered, setIsHovered] = useState(false);
  const [showCreate, setShowCreate] = useRecoilState(showCreateState);
  const resetCalender = useResetRecoilState(calendarInfoState);
  const resetClicked = useResetRecoilState(clickedDateState);
  const calendarInfo = useRecoilValue(calendarInfoState);
  const calendarId = useRecoilValue(getCalendarIdState);
  const [calendar, setCalendar] = useRecoilState(calendarInfoState);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태를 관리하는 변수

  // 수정 모드를 토글하는 함수
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setShowCreate(false);
    resetCalender();
    resetClicked();
    navigate('/');
    setIsHovered(false);
  }

  // 페이지 이동을 위한 함수
  const navigateTo = (path) => () => {
    navigate(path);
  };

  // 현재 경로에 따라 헤더 상태 업데이트
  useEffect(() => {
    if (location.pathname.includes('register/calendar')) {
      setHeaderSettings({ showDefalut: false, showFeatures: true, showDetail: false, showModify: false });
    } else if (location.pathname.includes('my/calendar/')) {
      setHeaderSettings({ showDefalut: false, showFeatures: false, showDetail: true, showModify: false });
    }
    else {
      setHeaderSettings({ showDefalut: true, showFeatures: false, showDetail: false, showModify: false });
    }
  }, [location, setHeaderSettings]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  const handleSubmit = async () => {
    try {
      const response = await calendarService.createCalendar(calendarInfo);
      if (response.success) {
        alert("일정 등록되었습니다.");
        //상세일정 페이지로 이동해야함.
        resetClicked();
        navigate(`/my/calendar/${response.data.calendarId}`, { state: { calendarId: response.data.calendarId } });
      } else {
        console.error(response.error);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleTrans = () => {
    setHeaderSettings({ showDefalut: false, showFeatures: false, showDetail: true, showModify: true });
  }

  const handleModify = async () => {
    try {
      const response = await calendarService.editCalendar(calendarId, calendarInfo);
      if (response.success) {
        alert("일정 수정되었습니다.");
        console.log("response", response);
        //상세일정 페이지로 이동해야함.
        resetClicked();
        navigate(`/my/calendar/${response.data.calendarId}`, { state: { calendarId: response.data.calendarId } });
      } else {
        console.error(response.error);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleCancelModify = () => {
    setHeaderSettings({ showDefalut: false, showFeatures: false, showDetail: true, showModify: false });
    navigate(`/my/calendar/${calendarId}`, { state: { calendarId: { calendarId } } });
  }

  const handledele = async () => {
    try {
      const response = await calendarService.deleteCalendar(calendarId);
      if (response.success) {
        alert("일정 삭제되었습니다.");
        console.log("response", response);
        //상세일정 페이지로 이동해야함.
        resetClicked();
        navigate('/');

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
        <div>
          {calendar.title && (
            <div>
              {showModify ? (
                <input
                  type="text"
                  value={calendar.title}
                  onChange={(e) => setCalendar({ ...calendar, title: e.target.value })}
                />
              ) : (
                <div onMouseEnter={toggleEditing}>{calendar.title}</div>
              )}
            </div>
          )}
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
                    <li onClick={navigateTo('/register/calendar')}>일정 등록</li>
                    <li onClick={navigateTo('/register/post')}>게시글 등록</li>
                  </ul>
                </li>
                <li className={styles.header__menu} onClick={navigateTo('/mypage')}>마이룸
                  <ul className={isHovered ? styles.subVisible : styles.sub}>
                    <li onClick={navigateTo('/my/reviews')}>내 리뷰</li>
                    <li onClick={navigateTo('/my/calendar')}>내 일정</li>
                    <li onClick={navigateTo('/my/community')}>내 커뮤니티</li>
                  </ul>
                </li>
              </ul>
            </nav>
            {getToken ?
              <div onClick={handleLogout} className={styles.header__logout}>로그아웃</div>
              :
              <div onClick={navigateTo('/login')} className={styles.header__logout}>로그인</div>

            }
          </div>
        }
        {showFeatures &&
          <div className={styles.header__btns}>
            <button className={styles.cancel_btn} onClick={handleCancel}>취소</button>
            {showCreate && <button className={styles.confirm_btn} onClick={handleSubmit}>등록</button>}
          </div>
        }
        {showDetail &&
          <div className={styles.header__btns}>
            {showModify && <button className={styles.cancel_btn} onClick={handleCancelModify}>취소</button>}
            {!showModify && <button className={styles.confirm_btn} onClick={handledele}>삭제</button>}
            {!showModify && <button className={styles.confirm_btn} onClick={handleTrans}>수정</button>}
            {showModify && <button className={styles.confirm_btn} onClick={handleModify}>완료</button>}
          </div>
        }
      </div>
      {showDefalut && <div className={isHovered ? styles.nav__backgroundVisible : styles.nav__background}></div>}
    </section>
  )
}

export default Header