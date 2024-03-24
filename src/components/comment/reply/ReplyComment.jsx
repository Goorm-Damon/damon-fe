import React, { useEffect, useState } from 'react'
import styles from './ReplyComment.module.scss'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfostate } from '../../../states/user/userInfoState';
import { reviewInfoState } from '../../../states/review/reviewState';
import * as reviewService from '../../../apis/services/reviewService';

const ReplyComment = ({reviewId,parent,setCommentList}) => {

  const navigate = useNavigate();
  const [local, setLocal] = useState([]);
  const [content, setContent] = useState(''); //댓글 내용
  const [comment, setComment] = useState({
    parentId: parent,
    content: '',
  });

  // const [commentList, setCommentList] = useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfostate);
  const [reviewInfo, setReviewInfo] = useRecoilState(reviewInfoState);


  const handleReply = async (e) => {
    try {
      e.preventDefault();
      const response = await reviewService.createComment(reviewId,comment);
      if (response.status === 200) {
        setReviewInfo(response.data.data);
        setCommentList(response.data.data.reviewComments);
        setContent('');
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setComment({ parentId: parent, content: content });
  }, [content]);

  useEffect(() => {
    setCommentList(reviewInfo.reviewComments);
  }, [reviewInfo]);

  return (
    <div>
        <div>
          <div className={styles.comment__header}>
            <div className={styles.profile__img}>
              <img src={userInfo.data.profile} alt="user profile" />
            </div>
            <textarea
              value={content}
              className={styles.comment__input}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Reply..."
            />
            <button onClick={handleReply}>등록</button>
          </div>
        </div>
    </div>
  );
};

export default ReplyComment;