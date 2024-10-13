import axios from 'axios';

const editUser = async (userId, updatedData) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `https://reqres.in/api/users/${userId}`,
      data: updatedData
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export { editUser };
