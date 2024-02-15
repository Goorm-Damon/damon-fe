import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Main from './pages/main/Main';
import RegisterCalendar from './pages/calendars/register-calendar/RegisterCalendar';
import MyCalendar from './pages/calendars/my-calendar/MyCalendar';
// import Login from './pages/login/Login';
import Review from './pages/review/review';
import DetailCalendar from './pages/calendars/detail-calendar/DetailCalendar';
import RegisterReview from './pages/review/register-review/RegisterReview';
import DetailReview from './pages/review/detail-review/DetailReview';
import MyPage from './pages/mypage/MyPage';

import Login from './pages/social-login/Login';
import KakaoRed from './components/social-login/kakao/KakaoRed';
import NaverRed from './components/social-login/naver/NaverRed';



function App() {
  console.log(process.env.REACT_APP_API_MODE);
  
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/login/oauth2/code/kakao' element={<KakaoRed />} />
      {/* <Route path='/login/oauth2/code/naver' element={<NaverRed />} /> */}

      <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='review' element={<Review />} />
        <Route path='review/:id' element={<DetailReview />} />
        <Route path='register/review' element={<RegisterReview />} />
        <Route path='register/calendar' element={<RegisterCalendar />} />
        <Route path='my/calendar' element={<MyCalendar />} />
        <Route path='my/calendar/:id' element={<DetailCalendar />} />
        <Route path='mypage' element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;


