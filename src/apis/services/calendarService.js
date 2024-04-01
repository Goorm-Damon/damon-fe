import axios from "../utils/apiutils"

//일정 등록
export const createCalendar = async (calendarData) => {
  try {
    const response = await axios.post('/api/calendar',calendarData);
    return response;
  } catch (error) {
    console.log('Error creating Calendar', error);
    return error;
  }
}


//일정 수정
export const editCalendar = async (id,calendarData) => {
  try {
    const response = await axios.put(`/api/calendar/${id}`,calendarData);
    return response;
  } catch (error) {
    console.log('Error editing Calendar', error);
    return error;
  }
}

//일정 삭제
export const deleteCalendar = async (id) => {
  try {
    const response = await axios.delete(`/api/calendar/${id}`);
    return response;
  } catch (error) {
    console.log('Error deleting Calendar', error);
    return error;
  }
}

//일정 선택 삭제
export const deleteSelecCalendar = async (deleteIds) => {
  try {
    const response = await axios.delete('/api/calendar',{data:deleteIds});
    return response;
  } catch (error) {
    console.log('Error deleting Calendar', error);
    return error;
  }
}

//내 일정 리스트 조회
export const getCalendar = async () => {
  try {
    const response = await axios.get(`/api/top5/calendar`);
    return response;
  } catch (error) {
    console.log('Error getting Calendar', error);
    return error;
  }
}

//내 일정 리스트 조회
export const getMyCalendar = async (page,size) => {
  try {
    const response = await axios.get(`/api/my/calendar?page=${page}&size=${size}`);
    return response;
  } catch (error) {
    console.log('Error getting Calendar', error);
    return error;
  }
}

//일정 상세 조회
export const getDetailCalendar = async (id) => {
  try {
    const response = await axios.get(`/api/my/calendar/${id}`);
    return response;
  } catch (error) {
    console.log('Error getting Calendar ', error);
    return error;
  }
}