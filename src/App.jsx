import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Main from './pages/main/Main';
import RegisterCalendar from './pages/calendars/register-calendar/RegisterCalendar';
import MyCalendar from './pages/calendars/my-calendar/MyCalendar';
import Login from './pages/login/Login'
import Review from './pages/review/review';


function App() {
  console.log(process.env.REACT_APP_API_MODE);
  
  return (
    <Routes>
      <Route path='/' element={<Login />} />

      <Route path='/' element={<Layout />}>
        <Route path='main' element={<Main />} />
        <Route path='review/:id' element={<Review />} />
        <Route path='register/calender' element={<RegisterCalendar />} />
          
        <Route path='my/calendar' element={<MyCalendar />} />
      </Route>
    </Routes>
  );
}

export default App;


