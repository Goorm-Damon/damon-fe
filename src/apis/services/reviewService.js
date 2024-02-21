import apiutils from "../utils/apiutils"

//리뷰 등록
export const createReview = async (reviewData) => {
  try {
    const response = await apiutils.create('/api/review', reviewData);
    return response;
  } catch (error) {
    console.log('Error creating review', error);
    return error;
  }
}


//리뷰 수정
export const editReview = async (id,reviewData) => {
  try {
    const response = await apiutils.update(`/api/review/${id}`,reviewData);
    return response;
  } catch (error) {
    console.log('Error editing review', error);
    return error;
  }
}

//리뷰 삭제
export const deleteReview = async (id) => {
  try {
    const response = await apiutils.del(`/api/review/${id}`);
    return response;
  } catch (error) {
    console.log('Error deleting review', error);
    return error;
  }
}

//리뷰 좋아요
export const likeReview = async (id) => {
  try {
    const response = await apiutils.patch(`/api/review/${id}`);
    return response;
  } catch (error) {
    console.log('Error deleting review', error);
    return error;
  }
}

//리뷰 전체 조회
export const getReview = async (page,pageSize) => {
  try {
    const response = await apiutils.read(`/api/review/list?page=${page}&pageSize=${pageSize}`);
    return response;
  } catch (error) {
    console.log('Error getting review', error);
    return error;
  }
}

//리뷰 전체 조회(지역)
export const getAreaReview = async (page,pageSize,area) => {
  try {
    const response = await apiutils.read(`/api/review/list?page=${page}&pageSize=${pageSize}&area=${area}`,{page,pageSize,area});
    return response;
  } catch (error) {
    console.log('Error getting review', error);
    return error;
  }
}

//내 리뷰 전체 조회
export const getMyReview = async () => {
  try {
    const response = await apiutils.read(`/api/review/my/list`);
    return response;
  } catch (error) {
    console.log('Error getting my review', error);
    return error;
  }
}

//리뷰 상세 조회
export const getDetailReview = async (id) => {
  try {
    const response = await apiutils.read(`/api/review/${id}`);
    return response;
  } catch (error) {
    console.log('Error getting review', error);
    return error;
  }
}

//좋아요 한 리뷰 조회
export const getLikeReview = async (page,pageSize) => {
  try {
    const response = await apiutils.read(`/api/review/likes?page=${page}&pageSize=${pageSize}`);
    return response;
  } catch (error) {
    console.log('Error getting likes review', error);
    return error;
  }
}