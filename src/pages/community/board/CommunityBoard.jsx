import React, { useEffect, useState } from 'react';
import styles from './CommunityBoard.module.scss';
import { getCommunity, createCommunity } from "../../../apis/services/communityService";

const CommunityBoard = () => {
  const [communityData, setCommunityData] = useState([]);
  const [communityType, setCommunityType] = useState('번개'); // 기본값은 '번개'

  useEffect(() => {
    // 컴포넌트가 마운트될 때 번개 타입의 커뮤니티 데이터를 가져옵니다.
    fetchCommunityData('번개');
  }, []);

  const fetchCommunityData = (type) => {
    // API를 호출하여 커뮤니티 데이터를 가져오는 함수
    getCommunity(type)
      .then(data => setCommunityData(data))
      .catch(error => console.error(`Error fetching ${type} community data:`, error));
  };

  const handleLightningButtonClick = () => {
    // 번개버튼 클릭 시 해당 타입의 커뮤니티 데이터를 가져옵니다.
    setCommunityType('번개');
    fetchCommunityData('번개');
  };

  const handleFreeButtonClick = () => {
    // 자유기버튼 클릭 시 해당 타입의 커뮤니티 데이터를 가져옵니다.
    setCommunityType('자유');
    fetchCommunityData('자유');
  };

  const handleCreatePostButtonClick = () => {
    // 글 등록하기 버튼 클릭 시 글 등록 페이지로 이동합니다.
    // 여기에 페이지 이동 로직 추가

    // 글 등록 API 호출
    const newCommunityData = {
      // 새로운 커뮤니티 데이터를 여기에 입력합니다.
    };

    createCommunity(newCommunityData)
      .then(response => {
        // 성공적으로 커뮤니티가 생성되었을 때의 로직을 추가합니다.
        console.log('Community created successfully:', response);
        // 필요하다면 생성된 커뮤니티를 다시 가져와 화면에 업데이트할 수 있습니다.
        fetchCommunityData(communityType);
      })
      .catch(error => {
        // 커뮤니티 생성 중 오류가 발생했을 때의 처리 로직을 추가합니다.
        console.error('Error creating community:', error);
      });
  };

  return (
    <div className={styles['community-list']}>
      <div className={styles['community-card']}>
        <div className={styles['community-title']}>커뮤니티</div>
        <div className={styles['title']}>
          <div className={styles['order-button-latest']}>최신순</div>
          <div className={styles['order-button']} onClick={handleLightningButtonClick}>번개버튼</div>
          <div className={styles['order-button-free']} onClick={handleFreeButtonClick}>자유기버튼</div>
          <div className={styles['create-post-button']} onClick={handleCreatePostButtonClick}>글 등록하기</div>
        </div>
        {communityData.length > 0 &&
          communityData.map((data) => (
            <div key={data.communityId}>
              <div className={styles['title']}>
                {data.title &&
                  (data.title.length > 20 ? data.title.slice(0, 20) + '...' : data.title)}
              </div>
              <div className={styles['reaction']}>
                <p>Like Count: {data.likes && data.likes.length}</p>
                <p>Comment Count: {data.comments && data.comments.length}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommunityBoard;