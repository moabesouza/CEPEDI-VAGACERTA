import axios from "axios";
import { User } from "../@types/user";

const API_BASE_URL = "http://192.168.0.10:3000";

const getEmpresa = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/empresa`);
    console.log("Dados da empresa:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados da empresa:", error);
    throw error; 
  }
};


const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/usuarios`);
  return response.data;
};

const postUsers = async (data: User) => {
  const response = await axios.post(`${API_BASE_URL}/usuarios`, data);
  return response.status;
};

const api = {
  empresa: {
    get: getEmpresa,
  },
  users: {
    get: getUsers,
    post: postUsers,
  },
};

export default api;
