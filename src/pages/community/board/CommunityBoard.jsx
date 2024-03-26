import React, { useEffect, useState } from 'react';
import styles from './CommunityBoard.module.scss';
import { getCommunity, createCommunity } from "../../../apis/services/communityService";
import { useNavigate, useLocation } from 'react-router-dom';
import CommunityLists from '../../community/boardList/CommunityLists';

const CommunityBoard = () => {
  const [communityData, setCommunityData] = useState([]);
  const [communityType, setCommunityType] = useState('전체');
  const [sortByLatest, setSortByLatest] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Added currentPage state
  const navigate = useNavigate();
  const location = useLocation();

  const fetchAllCommunityData = () => {
    getCommunity(communityType)
      .then(data => {
        if (location.pathname === '/community') {
          setCommunityData(data);
        } else {
          let sortedData = [...data.content];
          if (sortByLatest) {
            sortedData.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
          }
          setCommunityData({ ...data, content: sortedData });
        }
      })
      .catch(error => console.error(`Error fetching community data:`, error));
  };

  useEffect(() => {
    fetchAllCommunityData();
  }, [communityType, sortByLatest]); // Adding communityType and sortByLatest as dependencies, and ignoring fetchAllCommunityData

  const handleLatestButtonClick = () => {
    setSortByLatest(true);
    setCurrentPage(1); // Reset currentPage when sorting by latest
    fetchAllCommunityData(); // Fetch data again to apply sorting
  };

  const handleTypeButtonClick = (type) => {
    setCommunityType(type);
    setSortByLatest(false);
  };

  const handleCreatePostButtonClick = () => {
    const newCommunityData = {
      // Add logic to create new community data
    };

    createCommunity(newCommunityData)
      .then(response => {
        console.log('Community created successfully:', response);
        navigate('/boardList');
      })
      .catch(error => {
        console.error('Error creating community:', error);
      });
  };

  return (
    <div>
      <div className={styles['community-list']}>
        <div className={styles['community-card']}>
          <div className={styles['community-title']}>커뮤니티</div>
          <div className={styles['title']}>
            <div className={styles['order-button-latest']} onClick={handleLatestButtonClick}>최신순</div>
            <div className={styles['order-button']} onClick={() => handleTypeButtonClick('번개')}>번개버튼</div>
            <div className={styles['order-button-free']} onClick={() => handleTypeButtonClick('자유')}>자유기버튼</div>
            <div className={styles['create-post-button']} onClick={handleCreatePostButtonClick}>글 등록하기</div>
            {/* 최신화 버튼 추가 */}
            <div className={styles['latest-button']} onClick={handleLatestButtonClick}>최신화</div>
          </div>
        </div>
        <CommunityLists
          backendData={communityData}
          communityType={communityType}
          sortByLatest={sortByLatest}
          currentPage={currentPage} // Pass currentPage to CommunityLists
          setCurrentPage={setCurrentPage} // Pass setCurrentPage to CommunityLists
        />
      </div>
    </div>
  );
};

export default CommunityBoard;