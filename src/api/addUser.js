import axios from 'axios';

const addUser = async (userData) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `https://reqres.in/api/users`,
      data: userData
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export { addUser };
