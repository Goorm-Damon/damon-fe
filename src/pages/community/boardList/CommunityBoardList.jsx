import React, { useState } from 'react';
import styles from '../boardList/CommunityBoardList.module.scss';
import CommunityLists from './CommunityLists'; // Import the CommunityLists component
import CommunityList from './CommunityList'; // Import the CommunityList component

const CommunityBoardList = ({ post }) => {
  const [comment, setComment] = useState('');

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
      <div className={styles.postHeader}>
        <p>작성자: {post.author || 'Unknown'}</p>
      </div>
      <div className={styles.postContent}>
        <h2>{post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <div className={styles.postFooter}>
        <p>좋아요: {post.likes} | 댓글수: {post.comments.length}</p>
      </div>
      <div className={styles.postActions}>
        <button onClick={() => console.log('Go back to list')}>목록으로</button>
        <button onClick={() => console.log('Edit post')}>수정하기</button>
      </div>
      <div className={styles.commentSection}>
        <textarea
          placeholder="댓글을 입력하세요..."
          value={comment}
          onChange={handleCommentChange}
        />
        <button onClick={handleCommentSubmit}>댓글 등록하기</button>
      </div>
      <div className={styles.communitySection}>
        {/* Include the CommunityLists component here */}
        <CommunityLists />
      </div>
      <div className={styles.communityListSection}>
        {/* Include the CommunityList component here */}
        <CommunityList name="Sample Community" />
      </div>
    </div>
  );
};

export default CommunityBoardList;