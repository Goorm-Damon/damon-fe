import React, { useState } from 'react';
import styles from './CommunityBoardList.module.css'; // Make sure to import the correct CSS file

const CommunityBoardList = ({ post }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // Handle comment submission logic
    console.log('Comment submitted:', comment);
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <p>작성자: {post.author}</p>
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
    </div>
  );
};

export default CommunityBoardList;