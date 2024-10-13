import axios from 'axios';

const deleteUser = async (userId) => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `https://reqres.in/api/users/${userId}`,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export { deleteUser };
