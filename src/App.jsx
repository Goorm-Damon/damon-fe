// import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import './axiosconfig'; // Axios 인터셉터 설정 import
import { AuthProvider } from './context/AuthContext';
import Login from './pages/login/Login'
import Main from './pages/main/Main';
import Review from './pages/review/review';
import RegisterCalendar from './pages/calendars/register-calendar/RegisterCalendar';
import KakaoRedirectHandler from './components/login/KakaoLoginRedirect'
import NaverRedirectHandler from './components/login/NaverLoginRedirect'
import ReviewCreate from './pages/review/reviewCreate/ReviewCreate';
import ReviewUpdate from './pages/review/reviewUpdate/ReviewUpdate';


function App() {
  return (
    <AuthProvider>
    <Routes>
      {/* <비인가페이지 들어가는곳> */}
      <Route path='/' element={<Login />} />
      <Route path='/oauth2/authorization/kakao' element={<KakaoRedirectHandler />} />
      <Route path='/oauth2/authorization/naver' element={<NaverRedirectHandler />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Layout />}>
          <Route path='main' element={<Main />} />
          <Route path='review' element={<Review />} />
          <Route path='register/calendar' element={<RegisterCalendar />} />
          <Route path='register/reviewCreate' element={<ReviewCreate />} />
          {/* <Route path='register/reviewUpdate' element={<ReviewUpdate />} /> */}
          {/* <Route path='register/community' element={<coummunityAdd />} /> */}
          {/* <Route path='view/myschedule' element={<MySchedule />} /> */}
        </Route>
      </Route>
    </Routes>
    </AuthProvider>
  );
}

export default App;


