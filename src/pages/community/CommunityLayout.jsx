import React from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import style from './CommunityLayout.module.scss';
import CommunityBoard from './board/CommunityBoard';
import CommunityBoardList from './boardList/CommunityBoardList';
import CommunityLists from './boardList/CommunityLists';

const CommunityLayout = () => {
  const navigate = useNavigate();

  const onClickHeader = () => {
    navigate('/');
  };

  return (
    <div>
      <header onClick={onClickHeader} className={style.header}>
        <div>커뮤니티</div>
      </header>
      <main className={style.main}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<CommunityBoard />} />
            <Route path="board" element={<CommunityBoard />} />
            <Route path="boardList" element={<CommunityBoardList />} />
            <Route path="boardLists" element={<CommunityLists />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default CommunityLayout;