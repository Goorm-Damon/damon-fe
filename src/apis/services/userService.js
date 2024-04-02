import axios from '../utils/apiutils'

export const updateNickName = async (newNickname) => {
  try {
    const response = await axios.patch(`/api/user/updateNickname?newNickname =${newNickname}`);
    return response;
  } catch (error) {
    console.log('Error update nickname', error);
    return error;
  }
}

export const deleteUser = async (newNickname ) => {
  try {
    const response = await axios.delete('/api/user/delete', );
    return response;
  } catch (error) {
    console.log('Error deleting user', error);
    return error;
  }
}
