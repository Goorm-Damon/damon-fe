import axios from '../utils/apiutils'

//리뷰 등록
export const createReview = async (reviewData) => {
  try {
    const response = await axios.post('/api/review', reviewData);
    return response;
  } catch (error) {
    console.log('Error creating review', error);
    return error;
  }
}


//리뷰 수정
export const editReview = async (id,reviewData) => {
  try {
    const response = await axios.put(`/api/review/${id}`,{data:reviewData});
    return response;
  } catch (error) {
    console.log('Error editing review', error);
    return error;
  }
}

//리뷰 삭제
export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(`/api/review/${id}`);
    return response;
  } catch (error) {
    console.log('Error deleting review', error);
    return error;
  }
}

//리뷰 좋아요
export const likeReview = async (id) => {
  try {
    const response = await axios.patch(`/api/review/${id}`);
    return response;
  } catch (error) {
    console.log('Error deleting review', error);
    return error;
  }
}

//리뷰 전체 조회
export const getReview = async (page,pageSize) => {
  try {
    const response = await axios.get(`/api/review/list?page=${page}&pageSize=${pageSize}`);
    return response;
  } catch (error) {
    console.log('Error getting review', error);
    return error;
  }
}

//리뷰 전체 조회(지역)
export const getAreaReview = async (page,pageSize,area) => {
  try {
    const response = await axios.get(`/api/review/list?page=${page}&pageSize=${pageSize}&area=${area}`,{page,pageSize,area});
    return response;
  } catch (error) {
    console.log('Error getting review', error);
    return error;
  }
}

//내 리뷰 전체 조회
export const getMyReview = async () => {
  try {
    const response = await axios.get(`/api/review/my/list`);
    return response;
  } catch (error) {
    console.log('Error getting my review', error);
    return error;
  }
}

//리뷰 상세 조회
export const getDetailReview = async (id) => {
  try {
    const response = await axios.get(`/api/review/${id}`);
    return response;
  } catch (error) {
    console.log('Error getting review', error);
    return error;
  }
}

//좋아요 한 리뷰 조회
export const getLikeReview = async (page,pageSize) => {
  try {
    const response = await axios.get(`/api/review/likes?page=${page}&pageSize=${pageSize}`);
    return response;
  } catch (error) {
    console.log('Error getting likes review', error);
    return error;
  }
}

//베스트 리뷰 조회
export const getBestReview = async () => {
  try {
    const response = await axios.get(`/api/review/best`);
    return response;
  } catch (error) {
    console.log('Error getting best review', error);
    return error;
  }
}

//리뷰 댓글 등록
export const createComment = async (reviewId,commentData) => {
  try {
    const response = await axios.post(`/api/review/${reviewId}/comments`, commentData);
    return response;
  } catch (error) {
    console.log('Error creating comment', error);
    return error;
  }
}

//리뷰 댓글 삭제
export const deleteComment = async (reviewId, commentId) => {
  try {
    const response = await axios.delete(`/api/review/${reviewId}/comments/${commentId}`);
    return response;
  } catch (error) {
    console.log('Error deleting comment', error);
    return error;
  }
}

//리뷰 댓글 수정
export const editComment = async (reviewId, commentId, commentData) => {
  try {
    const response = await axios.patch(`/api/review/${reviewId}/comments/${commentId}`, commentData);
    return response;
  } catch (error) {
    console.log('Error editing comment', error);
    return error;
  }
}
