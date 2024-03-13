import React, { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import * as reviewService from '../../apis/services/reviewService';
import { useRecoilState } from 'recoil';
import { reviewInfoState } from '../../states/review/reviewState';
import { userInfostate } from '../../states/user/userInfoState';
import { useNavigate } from 'react-router-dom';
import ReplyComment from './reply/ReplyComment';

const Comment = ({ reviewId }) => {
  const navigate = useNavigate();
  const [local, setLocal] = useState([])
  const [content, setContent] = useState('');
  const [parentId, setParentId] = useState(0);
  const [comment, setComment] = useState({
    parentId: 0,
    content: '',
  });
  const [reviewInfo, setReviewInfo] = useRecoilState(reviewInfoState);
  const [commentList, setCommentList] = useState([]);

  const [userInfo, setUserInfo] = useRecoilState(userInfostate);

  const handleComment = async (e) => {
    try {
      e.preventDefault();
      const response = await reviewService.createComment(reviewId, comment);
      if (response.status === 200) {
        setCommentList(response.data.reviewComments);
        setContent("");
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
    setLocal(commentList.filter(comment => comment.parentId === null))
  }, [reviewInfo.reviewComments]);

//   useEffect(() => {
//     setLocal(commentList.filter(comment => comment.parentId === null))
//     // parentId 구조 확인 후 0이나 root 처리 해야함. 일단 null 값
// }, [commentList])

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
          onChange={(e) => {setContent(e.target.value);}}
          multiline
          placeholder="댓글을 입력해주세요"
        />
        <button onClick={handleComment}>등록</button>
      </div>
      <div className={styles.comment__body}>
        {local &&
          local.map((item, index) => (
            <div key={index} className="comments-comment">
              <div className="comment-username">{item.name}</div>
              <div className="comment-username-date">
                <div className="comment-date">{item.createdDate}</div>
              </div>
              <div className="comment-content">{item.content}</div>
              <ReplyComment reviewId={reviewId} responseTo={item.parentId} />
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comment;
