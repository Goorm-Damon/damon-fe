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
  const [edit, setEdit] = useState(false);
  const [replyStates, setReplyStates] = useState([]);
  const [editReply, setEditReply] = useState(false);
  const [content, setContent] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editReplyContent, setEditReplyContent] = useState('');
  const [parentId, setParentId] = useState(0);
  const [comment, setComment] = useState({
    parentId: 0,
    content: '',
  });
  const [reviewInfo, setReviewInfo] = useRecoilState(reviewInfoState);
  const [commentList, setCommentList] = useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfostate);

  const toggleReply = (index) => {
    const newReplyStates = [...replyStates];
    newReplyStates[index] = !newReplyStates[index];
    setReplyStates(newReplyStates);
  };
  const handleComment = async (e) => {
    try {
      e.preventDefault();
      if (!content.trim()) {
        console.log("댓글 내용을 입력해주세요.");
        return;
      }
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
  
  const handleEdit = async (commentId, parentId, content) => {
    try {
      const response = await reviewService.editComment(reviewId, commentId, { parentId: parentId, content: content });
      if (response.status === 200) {
        setReviewInfo(response.data.data);
        setCommentList(response.data.data.reviewComments);
        setEdit(false);
        setEditReply(false);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await reviewService.deleteComment(reviewId, commentId);
      if (response.status === 200) {
        // reviewInfo에서 삭제된 댓글을 필터링하여 업데이트합니다.
        const updatedCommentList = commentList.filter(comment => comment.id !== commentId);
        setCommentList(updatedCommentList);
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

  useEffect(() => {
    if (commentList&& commentList.length > 0) {
      setReplyStates(Array(commentList.length).fill(false));
    } else {
      setReplyStates([]);
    }
  }, [commentList]);

  return (
    <div>
      <h2 className={styles.comment__title}>댓글</h2>
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
              // <div className={styles.comment__body}>
              <div key={index}>
                <div className={styles.comment__container}>
                  <div className={styles.comment__left}>
                    <div className={styles.profile__img}>
                      <img src={item.profileImage} alt="user profile" />
                    </div >
                  </div >
                  <div className={styles.comment__right}>
                    <div className={styles.name__date}>
                      <p className={styles.name}>{item.name}</p>
                      <p className={styles.date}>{item.createdDate}</p>
                    </div>
                    <div>
                      {edit && item.id === editContent.id ? (
                        <input
                          type="text"
                          value={editContent.content}
                          onChange={(e) => setEditContent({ ...editContent, content: e.target.value })}
                        />
                      ) : (
                        <div>{item.content}</div>
                      )}
                    </div>
                    {userInfo.data.identifier === item.identifier ? (
                      <div>
                        <div className={styles.edit__btn}>
                          {edit && item.id === editContent.id ? (
                            <button onClick={() => handleEdit(item.id, item.parentId, editContent.content)}>저장</button>
                          ) : (
                            <button onClick={() => {
                              setEdit(true);
                              setEditContent(item);
                            }}>수정</button>
                          )}
                          <button onClick={() => handleDelete(item.id)}>삭제</button>
                          <button onClick={() => toggleReply(index)}>댓글</button>

                        </div>
                        {replyStates[index] && (
                          <ReplyComment
                            reviewId={reviewId}
                            parent={item.id}
                            setCommentList={setCommentList}
                          />
                        )}
                      </div>

                    ) : (
                      <div>
                        <div className={styles.edit__btn}>
                          <button onClick={() => toggleReply(index)}>댓글</button>

                        </div>
                        {replyStates[index] && (
                          <ReplyComment
                            reviewId={reviewId}
                            parent={item.id}
                            setCommentList={setCommentList}
                          />
                        )}
                      </div>

                    )}
                    <hr />
                  </div>
                  {/* </div> */}

                </div>
                {item.replies &&
                  item.replies.map((reply, i) => (
                    <div key={index} className={styles.comment__container}>
                      <div className={styles.replies} key={i}>

                        <div className={styles.comment__left}>
                          <div className={styles.profile__img}>
                            <img src={reply.profileImage} alt="user profile" />
                          </div >
                        </div >
                        <div className={styles.comment__right}>
                          <div className={styles.name__date}>
                            <p className={styles.name}>{reply.name}</p>
                            <p className={styles.date}>{reply.createdDate}</p>
                          </div>
                          <div>
                            {editReply && reply.id === editReplyContent.id
                              ? (
                                <input
                                  type="text"
                                  value={editReplyContent.content}
                                  onChange={(e) => setEditReplyContent({ ...editReplyContent, content: e.target.value })}
                                />
                              ) : (
                                <div>{reply.content}</div>
                              )}
                          </div>
                          {userInfo.data.identifier === reply.identifier &&
                            <div className={styles.edit__btn}>
                              {editReply && reply.id === editReplyContent.id
                                ? (
                                  <button onClick={() => handleEdit(reply.id, reply.parentId, editReplyContent.content)}>저장</button>
                                ) : (
                                  <button onClick={() => {
                                    setEditReply(true);
                                    setEditReplyContent(reply);
                                  }}>수정</button>
                                )}
                              <button onClick={() => handleDeleteReply(reply.parentId, reply.id)}>삭제</button>
                            </div>
                          }
                          <hr />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
    </div>
  );
};

export default Comment;
