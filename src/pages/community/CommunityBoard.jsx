import React, { useEffect, useState } from 'react';
import styles from './CommunityBoard.module.scss';
import CommunityBoardList from '../boardList/CommunityBoardList';

const CommunityBoard = () => {
  const [communityData, setCommunityData] = useState([]);

  const testCommunityData = [
    // ... (your test data here)
  ];

  useEffect(() => {
    setCommunityData(testCommunityData);
  }, []);

  return (
    <div className={styles['community-list']}>
      <div className={styles['community-card']}>
        <div className={styles['title']}>
          <div className={styles['community-title']}>커뮤니티</div>
        </div>
        <CommunityBoardList communityData={communityData} />
      </div>
    </div>
  );
};

export default CommunityBoard;