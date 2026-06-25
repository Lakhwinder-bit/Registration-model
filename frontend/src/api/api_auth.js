import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const register_api = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/register`,
    data
  );

  return response.data;
};

export const login_api = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/login`,
    data,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const forget_api = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/forget-password`,
    data
  );

  return response.data;
};

export const resetPasswordApi =  async (token, passwordData) => {
    const response = await axios.post(
     `${BASE_URL}/reset-password/${token}`,
      passwordData
    );

    return response.data;
  };

export const getMe_api = async (data) => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    withCredentials: true,
  });

  return response.data;
};

export const logOut_api = async (data)=>{
    const response =  await axios.get(`${BASE_URL}/logout`,{
          withCredentials: true,
    })
    return response.data
}