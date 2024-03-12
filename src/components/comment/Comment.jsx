import React, { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import * as reviewService from '../../apis/services/reviewService';
import { useRecoilState } from 'recoil';
import { reviewInfoState } from '../../states/review/reviewState';
import { userInfostate } from '../../states/user/userInfoState';
import { useNavigate } from 'react-router-dom';

const Comment = ({ reviewId }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [parentId, setParentId] = useState(0);
  const [comment, setComment] = useState({
    parentId: 0,
    content: '',
  });
  const [reviewInfo, setReviewInfo] = useRecoilState(reviewInfoState);
  const [commentList, setCommentList] = useState([]);

  const [userInfo, setUserInfo] = useRecoilState(userInfostate);

  const handleComment = async () => {
    try {
      const response = await reviewService.createComment(reviewId, comment);
      if (response.status === 200) {
        setCommentList(response.data.reviewComments);
        console.log('댓글등록', response);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setComment({ parentId: parentId, content: content });
    console.log(comment.content);
  }, [content]);

  useEffect(() => {
    setCommentList(reviewInfo.reviewComments);
  }, [reviewInfo.reviewComments]);

  return (
    <div>
      <h2 className={styles.comment__title}>댓글</h2>
      <div className={styles.comment__header}>
        <div className={styles.profile__img}>
          <img src={userInfo.data.profile} alt="user profile" />
        </div>
        <textarea
          className="comments-header-textarea"
          maxRows={3}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          multiline
          placeholder="댓글을 입력해주세요✏️"
        />
        <button onClick={handleComment}>등록</button>
      </div>
      <div className={styles.comment__body}>
        {commentList &&
          commentList.map((item, index) => (
            <div key={index} className="comments-comment">
              <div className="comment-username-date">
                <div className="comment-date">{item.createdDate}</div>
              </div>
              <div className="comment-content">{item.content}</div>
              <div className="comment-username">{item.name}</div>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comment;
