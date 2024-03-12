import React, { useState } from 'react';
import styles from '../boardList/CommunityBoardList.module.scss';
import CommunityLists from './CommunityLists';
import CommunityList from './CommunityList';
import { useNavigate } from 'react-router-dom';
import { createCommunity } from '../../../apis/services/communityService'; // Updated import

const CommunityBoardList = ({ post }) => {
  const [comment, setComment] = useState('');
  const [newCommunityName, setNewCommunityName] = useState('');
  const navigate = useNavigate();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log('Comment submitted:', comment);
  };

  const handleCreateCommunity = async () => {
    try {
      const response = await createCommunity({ name: newCommunityName });
      console.log('Community created successfully:', response);
    } catch (error) {
      console.error('Error creating community:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
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
      <div className={styles.createCommunityContainer}>
        <input
          type="text"
          placeholder="New Community Name"
          value={newCommunityName}
          onChange={(e) => setNewCommunityName(e.target.value)}
        />
        <button onClick={handleCreateCommunity}>Create Community</button>
      </div>
      <CommunityLists />
      <CommunityList name="Example Community" />
    </div>
  );
};

export default CommunityBoardList;