import apiutils from "../utils/apiutils"

// 커뮤니티 추가
export const createCommunity = async (communityData) => {
  try {
    const response = await apiutils.create('/api/community', communityData);
    return response;
  } catch (error) {
    console.log('Error creating community', error);
    return error;
  }
};

// 커뮤니티 수정
export const editCommunity = async (id, communityData) => {
  try {
    const response = await apiutils.update(`/api/community/${id}`, communityData);
    return response;
  } catch (error) {
    console.log('Error editing community', error);
    return error;
  }
};

// 커뮤니티 삭제
export const deleteCommunity = async (id) => {
  try {
    const response = await apiutils.del(`/api/community/${id}`);
    return response;
  } catch (error) {
    console.log('Error deleting community', error);
    return error;
  }
};

// 커뮤니티 페이징 조회
export const getCommunity = async (type, page) => {
  try {
    const response = await apiutils.read(`/api/community?type=${type}&page=${page}`);
    return response;
  } catch (error) {
    console.log('Error getting community', error);
    return error;
  }
};

// 커뮤니티 단건 조회(상세 내용)
export const getDetailCommunity = async (id) => {
  try {
    const response = await apiutils.read(`/api/community/${id}`);
    return response;
  } catch (error) {
    console.log('Error getting community', error);
    return error;
  }
};