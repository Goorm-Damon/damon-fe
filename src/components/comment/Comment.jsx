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

  const handleEdit = async (commentId) => {
    // 수정 기능 구현
  };

  const handleDelete = async (commentId) => {
    // 삭제 기능 구현
    try {
      const response = await reviewService.deleteComment(reviewId, commentId);
      if (response.status === 200) {
        setContent('');
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReply = async (commentId, replyId) => {
    try {
      // 대댓글 삭제 요청 보내기
      const response = await reviewService.deleteComment(reviewId, replyId);
      if (response.status === 200) {
        const updatedCommentList = commentList.map(comment => {
          if (comment.id === commentId) {
            const updatedReplies = comment.replies.filter(reply => reply.id !== replyId);
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        });
        setCommentList(updatedCommentList);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setComment({ parentId: parentId, content: content });
  }, [content]);

  useEffect(() => {
    setCommentList(reviewInfo.reviewComments);
  }, [reviewInfo]);

  return (
    <div>
      <h2 className={styles.comment__title}>댓글</h2>
      <div className={styles.comment__container}>
        <div className={styles.comment__header}>
          <div className={styles.profile__img}>
            <img src={userInfo.data.profile} alt="user profile" />
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력해주세요"
          />
          <button onClick={handleComment}>등록</button>
        </div>
        <div className={styles.comment__body}>
          {commentList &&
            commentList.map((item, index) => (
              <div key={index}>
                <div>
                  <div>{item.createdDate}</div>
                </div>
                <div>{item.content}</div>
                <div>{item.name}</div>
                {userInfo.data.nickname === item.name ?
                  <div className={styles.edit__btn}>
                    <button onClick={() => handleEdit(item.id)}>수정</button>
                    <button onClick={() => handleDelete(item.id)}>삭제</button>
                    <ReplyComment reviewId={reviewId} parent={item.id} setCommentList={setCommentList} />
                  </div>
                  :
                  <div className={styles.edit__btn}>
                    <ReplyComment reviewId={reviewId} parent={item.id} setCommentList={setCommentList} />
                  </div>
                }
                <hr />
                {item.replies &&
                  item.replies.map((reply, i) => (
                    <div className={styles.replies} key={i}>
                      <div>
                        <div>{reply.createdDate}</div>
                      </div>
                      <div>{reply.content}</div>
                      <div>{reply.name}</div>
                      {userInfo.data.nickname === reply.name &&
                        <div className={styles.edit__btn}>
                          <button onClick={() => handleEdit(reply.id)}>수정</button>
                    <button onClick={() => handleDeleteReply(reply.parentId,reply.id)}>삭제</button>
                        </div>
                      }
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
