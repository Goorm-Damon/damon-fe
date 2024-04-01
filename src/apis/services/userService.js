import axios from '../utils/apiutils'

export const updateNickName = async (identifier,newNickname) => {
  try {
    const response = await axios.patch(`/api/user/updateNickname?identifier=${identifier}&newNickname=${newNickname}`);
    return response;
  } catch (error) {
    console.log('Error update nickname', error);
    return error;
  }
}

export const deleteUser = async (identifier) => {
  try {
    const response = await axios.delete(`/api/user/delete?identifier=${identifier}`, );
    return response;
  } catch (error) {
    console.log('Error deleting user', error);
    return error;
  }
}
