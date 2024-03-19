import React, { useEffect, useState } from 'react';
import styles from './CommunityBoard.module.scss';
import { getCommunity, createCommunity } from "../../../apis/services/communityService";
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import CommunityLists from '../../community/boardList/CommunityLists'; // Import the CommunityLists component

const CommunityBoard = () => {
  const [communityData, setCommunityData] = useState([]);
  const [communityType, setCommunityType] = useState('번개');
  const navigate = useNavigate(); // useNavigate 사용

  useEffect(() => {
    fetchCommunityData(communityType);
  }, [communityType]);

  const fetchCommunityData = (type) => {
    getCommunity(type, 0)
      .then(data => setCommunityData(data))
      .catch(error => console.error(`Error fetching ${type} community data:`, error));
  };

  const handleLightningButtonClick = () => {
    setCommunityType('번개');
  };

  const handleFreeButtonClick = () => {
    setCommunityType('자유');
  };

  const handleCreatePostButtonClick = () => {
    const newCommunityData = {
      // 새로운 커뮤니티 데이터를 여기에 입력합니다.
    };

    createCommunity(newCommunityData)
      .then(response => {
        console.log('Community created successfully:', response);
        // 글 등록 후 페이지 이동
        navigate('/boardList'); // 글 등록 후 페이지로 이동합니다.
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
            <div className={styles['order-button-latest']}>최신순</div>
            <div className={styles['order-button']} onClick={handleLightningButtonClick}>번개버튼</div>
            <div className={styles['order-button-free']} onClick={handleFreeButtonClick}>자유기버튼</div>
            <div className={styles['create-post-button']} onClick={handleCreatePostButtonClick}>글 등록하기</div>
          </div>
          {/* 커뮤니티 데이터 렌더링 */}
          {communityData.content && communityData.content.length > 0 &&
            communityData.content.map((data) => (
              <div key={data.communityId}>
                <div className={styles['title']}>
                  {data.title &&
                    (data.title.length > 20 ? data.title.slice(0, 20) + '...' : data.title)}
                </div>
                <div className={styles['reaction']}>
                  <p>Like Count: {data.likesCount}</p>
                  <p>Comment Count: {data.commentsCount}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <CommunityLists backendData={null} /> {/* Render CommunityLists component */}
    </div>
  );
};

export default CommunityBoard;