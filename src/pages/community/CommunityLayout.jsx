import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import style from './CommunityLayout.module.scss';
import CommunityBoard from './board/CommunityBoard';
import CommunityBoardList from './boardList/CommunityBoardList';
import CommunityLists from './boardList/CommunityLists';

const CommunityLayout = () => {
  return (
    <div>
      <main className={style.main}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<CommunityBoard />} />
            <Route path="board" element={<CommunityBoard />} />
            <Route path="community" element={<CommunityLists />} />
            <Route path="boardList" element={<CommunityBoardList />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default CommunityLayout;