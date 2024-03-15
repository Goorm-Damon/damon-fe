import React, { useState, useEffect } from 'react';
import styles from '../boardList/CommunityBoardList.module.scss';
import CommunityList from '../boardList/CommunityList';
import { useNavigate } from 'react-router-dom';
import { getCommunity } from "../../../apis/services/communityService";

const CommunityBoardList = () => {
  const [comment, setComment] = useState('');
  // const [communityData, setCommunityData] = useState([]);

  const navigate = useNavigate();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // Handle comment submission logic
    console.log('Comment submitted:', comment);
  };

  useEffect(() => {
    fetchCommunityData('번개');
  }, []);

  const fetchCommunityData = (type) => {
    getCommunity(type, 1)
      .then(data => console.log(data)) // Just logging the data for now
      .catch(error => console.error(`Error fetching ${type} community data:`, error));
  };

  return (
    <div className={styles.postContainer}>
      <header className={styles.header}>
        <div onClick={() => navigate('/')}>커뮤니티</div>
      </header>
      <div className={styles.commentContainer}>
        <textarea
          placeholder="Add your comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <button onClick={handleCommentSubmit}>Submit Comment</button>
      </div>
      <CommunityList name="Example Community" />
      {/* Add more CommunityList components or use dynamic data as needed */}
    </div>
  );
};

export default CommunityBoardList;