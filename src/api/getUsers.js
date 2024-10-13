import axios from 'axios';

const getUsers = async (page) => {
  try{
    const response = await axios ({
        method: 'get',
        url: `https://reqres.in/api/users?page=${page}`
    });
    return response.data
  } catch(error){
    console.log(error)
  }
};

export { getUsers };
