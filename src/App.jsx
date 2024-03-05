import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Main from './pages/main/Main';
import RegisterCalendar from './pages/calendars/register-calendar/RegisterCalendar';
import Login from './pages/login/Login'
import Review from './pages/review/review';
import CommunityBoard from './pages/community/board/CommunityBoard';
import CommunityBoardList from './pages/community/board/CommunityBoardList';


function App() {
  console.log(process.env.REACT_APP_API_MODE);
  
  return (
    <Routes>
      <Route path='/' element={<Login />} />

      <Route path='/' element={<Layout />}>
        <Route path='main' element={<Main />} />
        <Route path='review/:id' element={<Review />} />
        <Route path='community/board' element={<CommunityBoard />} />
        <Route path='community/boardList' element={<CommunityBoardList />} />
        <Route path='register/calender' element={<RegisterCalendar />} />
          
        {/* <Route path='view/myschedule' element={<MySchedule />} /> */}
      </Route>
    </Routes>
  );
}

export default App;


