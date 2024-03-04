import React, { useEffect, useState } from 'react';
import styles from './CommunityBoard.module.scss';

const CommunityBoard = () => {
  const [communityData, setCommunityData] = useState([]);

  const testCommunityData = [
    {
      communityId: 1,
      title: 'Delicious Recipes Hub',
      likes: [21, 22, 23],
      comments: [24, 25],
    },
    {
      communityId: 2,
      title: 'Healthy Living Tips',
      likes: [26, 27],
      comments: [28, 29, 30],
    },
    {
      communityId: 3,
      title: 'Travel Enthusiasts',
      likes: [31, 32],
      comments: [33, 34, 35],
    },
    {
      communityId: 4,
      title: 'Tech Innovations Forum',
      likes: [36, 37],
      comments: [38, 39, 40],
    },
    // Additional testCommunityData items can be added
  ];

  const dummyData = Array.from({ length: 4 }, (_, index) => ({
    communityId: index + 1,
    title: `Community ${index + 1}`,
    likes: [],
    comments: [],
  }));

  useEffect(() => {
    setCommunityData(testCommunityData); // Replace with testCommunityData for testing
  }, []);

  const handleLightningButtonClick = () => {
    console.log('Lightning button clicked');
    // Add your logic here
  };

  const handleFreeButtonClick = () => {
    console.log('Free button clicked');
    // Add your logic here
  };

  return (
    <div className={styles['community-list']}>
      <div className={styles['community-card']}>
        <div className={styles['title']}>
          <div className={styles['community-title']}>커뮤니티</div>
          <div className={styles['order-button']} onClick={handleLightningButtonClick}>번개버튼</div>
          <div className={styles['order-button']} onClick={handleFreeButtonClick}>자유기버튼</div>
          <div className={styles['order-button']}>최신순</div>
          <div className={styles['create-post-button']}>글 등록하기</div>
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