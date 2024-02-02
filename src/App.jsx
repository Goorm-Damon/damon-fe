// import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/login/Login'
import Main from './pages/main/Main';
import Review from './pages/review/Review';
import RegisterCalendar from './pages/calendars/register-calendar/RegisterCalendar';
import OAuth2RedirectHandlerKakao from './pages/login/kakao/OAuth2RedirectHandlerKakao';
import OAuth2RedirectHandlerNaver from './pages/login/naver/OAuth2RedirectHandlerNaver';
// import ReviewCreate from './pages/review/reviewCreate/ReviewCreate';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandlerKakao />} />
      <Route path="/oauth2/redirect/naver" element={<OAuth2RedirectHandlerNaver />} />

      <Route path='/' element={<Layout />}>
        <Route path='main' element={<Main />} />
        <Route path='review' element={<Review />} />
        <Route path='register/calendar' element={<RegisterCalendar />} />
        {/* <Route path='register/review' element={<ReviewCreate />} /> */}
        {/* <Route path='register/community' element={<coummunityAdd />} /> */}
        {/* <Route path='view/myschedule' element={<MySchedule />} /> */}
      </Route>
    </Routes>
  );
}

export default App;


