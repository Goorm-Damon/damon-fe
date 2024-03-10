import React, { useEffect, useState } from 'react'
import styles from './Comment.module.scss'
import * as reviewService from '../../apis/services/reviewService';
import { useRecoilState } from 'recoil';
import { reviewInfoState } from '../../states/review/reviewState';
import { userInfostate } from '../../states/user/userInfoState';
import { useNavigate } from 'react-router-dom';

const Comment = ({ reviewId }) => {

  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [parentId, setParentId] = useState(0);
  const [comment, setComment] = useState({
    parentId: 0,
    content: "",
  });
  const [reviewInfo, setReviewInfo] = useRecoilState(reviewInfoState);
  const [commentList, setCommentList] = useState(reviewInfo.reviewComments);
  const [userInfo, setUserInfo] = useRecoilState(userInfostate);

  const handleComment = async () => {
    try {
      const response = await reviewService.createComment(reviewId, comment);
      if (response.success) {
        setCommentList(response.data.reviewComments);
      } else {
        console.error(response.error);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(()=> {
    setComment({
      parentId: parentId,
      content: content
    });
  },[content])

  return (
    <div>
      <div className={styles.comment__header}>
        <div className={styles.profile__img}>
          <img src={userInfo.data.profile} />
        </div>
        <textarea
          className="comments-header-textarea"
          maxRows={3}
          onChange={(e) => {
            setContent(e.target.value)
          }}
          multiline placeholder="댓글을 입력해주세요✏️"
        />
        <button onClick={handleComment}>
          등록
        </button>
      </div>
      <div className={styles.comment__body}>

      </div>
    </div>
  )
}

export default Comment