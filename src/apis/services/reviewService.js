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

//리뷰 전체 조회
export const getReview = async (page,pageSize) => {
  try {
    const response = await apiutils.read('/api/review/list',{page,pageSize});
    return response;
  } catch (error) {
    console.log('Error getting review', error);
    return error;
  }
}

//리뷰 상세 조회
export const getDetailReview = async (id) => {
  try {
    const response = await apiutils.read(`/api/review/${id}`);
    return response;
  } catch (error) {
    console.log('Error getting review ', error);
    return error;
  }
}