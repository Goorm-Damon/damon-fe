// import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/login/Login'
import Main from './pages/main/Main';
import Review from './pages/review/review';
import ReviewCreatePage from './pages/review/reviewCreate/ReviewCreate';
import RegisterCalendar from './pages/calendars/register-calendar/RegisterCalendar';
import KakaoRedirectHandler from './components/login/KakaoLoginRedirect'
import NaverRedirectHandler from './components/login/NaverLoginRedirect'
import ReviewCreateRemakePage from './pages/review/reviewCreate/ReviewCreateRemake';



function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/oauth2/authorization/kakao' element={<KakaoRedirectHandler />} />
      <Route path='/oauth2/authorization/naver' element={<NaverRedirectHandler />} />

      <Route path='/' element={<Layout />}>
        <Route path='main' element={<Main />} />
        <Route path='review' element={<Review />} />
        <Route path='register/calendar' element={<RegisterCalendar />} />
        <Route path='register/review' element={<ReviewCreatePage />} />
        <Route path='register/reviewRemake' element={<ReviewCreateRemakePage />} />
        {/* <Route path='register/community' element={<coummunityAdd />} /> */}
        {/* <Route path='view/myschedule' element={<MySchedule />} /> */}
      </Route>
    </Routes>
  );
}

export default App;


