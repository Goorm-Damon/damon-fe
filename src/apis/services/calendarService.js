import apiutils from "../utils/apiutils"

//일정 등록
export const createCalendar = async (calendarData) => {
  try {
    const response = await apiutils.create('/api/calendar', calendarData);
    return response;
  } catch (error) {
    console.log('Error creating Calendar', error);
    return error;
  }
}


//일정 수정
export const editCalendar = async (id,calendarData) => {
  try {
    const response = await apiutils.update(`/api/calendar/${id}`,calendarData);
    return response;
  } catch (error) {
    console.log('Error editing Calendar', error);
    return error;
  }
}

//일정 삭제
export const deleteCalendar = async (id) => {
  try {
    const response = await apiutils.del(`/api/calendar/${id}`);
    return response;
  } catch (error) {
    console.log('Error deleting Calendar', error);
    return error;
  }
}

//일정 선택 삭제
export const deleteSelecCalendar = async (deleteIds) => {
  try {
    const response = await apiutils.selectDel('/api/calendar',deleteIds);
    return response;
  } catch (error) {
    console.log('Error deleting Calendar', error);
    return error;
  }
}

//내 일정 리스트 조회
export const getCalendar = async (page,size) => {
  try {
    const response = await apiutils.read(`/api/top5/calendar`);
    return response;
  } catch (error) {
    console.log('Error getting Calendar', error);
    return error;
  }
}

//내 일정 리스트 조회
export const getMyCalendar = async (page,size) => {
  try {
    const response = await apiutils.read(`/api/my/calendar?page=${page}&size=${size}`);
    return response;
  } catch (error) {
    console.log('Error getting Calendar', error);
    return error;
  }
}

//일정 상세 조회
export const getDetailCalendar = async (id) => {
  try {
    const response = await apiutils.read(`/api/my/calendar/${id}`);
    return response;
  } catch (error) {
    console.log('Error getting Calendar ', error);
    return error;
  }
}