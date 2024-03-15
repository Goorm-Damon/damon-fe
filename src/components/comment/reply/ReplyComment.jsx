import React, { useEffect, useState } from 'react'
import styles from './ReplyComment.module.scss'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfostate } from '../../../states/user/userInfoState';
import { reviewInfoState } from '../../../states/review/reviewState';
import * as reviewService from '../../../apis/services/reviewService';

const ReplyComment = ({reviewId,responseTo}) => {

  const navigate = useNavigate();
  const [local, setLocal] = useState([]);
  const [display, setDisplay] = useState(false);
  const [content, setContent] = useState(''); //댓글 내용
  const [parentId, setParentId] = useState(0);
  const [comment, setComment] = useState({
    parentId: responseTo,
    content: '',
  });

  const [commentList, setCommentList] = useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfostate);
  const [reviewInfo, setReviewInfo] = useRecoilState(reviewInfoState);


  const handleComment = async (e) => {
    try {
      e.preventDefault();
      const response = await reviewService.createComment(reviewId, { parentId, content });
      if (response.status === 200) {
        setCommentList(response.data.data.reviewComments);
        setContent('');
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   // 대댓글만 불러오기
  //   const filteredComments = reviewInfo.reviewComments.filter(comment => comment.parentId === responseTo);
  //   setCommentList(filteredComments);
  // }, [reviewInfo.reviewComments, responseTo]);

  return (
    <div>
      <button onClick={() => setDisplay(!display)}>댓글</button>
      {display &&
        <div>
          <div className={styles.comment__header}>
            <div className={styles.profile__img}>
              <img src={userInfo.data.profile} alt="user profile" />
            </div>
            <textarea
              className="comments-header-textarea"
              maxRows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="댓글을 입력해주세요"
            />
            <button onClick={handleComment}>등록</button>
          </div>
          <div className={styles.comment__body}>
            {commentList.map((comment, index) => (
              <div key={index} className="comments-comment">
                <div className="comment-username">{comment.name}</div>
                <div className="comment-username-date">
                  <div className="comment-date">{comment.createdDate}</div>
                </div>
                <div className="comment-content">{comment.content}</div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default ReplyComment;