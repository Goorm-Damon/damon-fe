import React, { useState } from 'react';
import styles from '../boardList/CommunityBoardList.module.scss';
import CommunityLists from '../boardList/CommunityLists';
import CommunityList from '../boardList/CommunityList';
import { useNavigate } from 'react-router-dom';

const CommunityBoardList = ({ post }) => {
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // Handle comment submission logic
    console.log('Comment submitted:', comment);
  };

  // Check if the post object is defined
  if (!post) {
    return <div>Loading...</div>; // You can render a loading indicator or handle the absence of post data in a different way
  }

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
      <CommunityLists />
      <CommunityList name="Example Community" />
      {/* Add more CommunityList components or use dynamic data as needed */}
    </div>
  );
};

export default CommunityBoardList;