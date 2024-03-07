import axios from 'axios';
import { User } from '../@types/user';

const API_BASE_URL = 'http://192.168.0.11:3000';

const getEmpresa = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/empresa`);
    console.log('Dados da empresa:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados da empresa:', error);
    throw error;
  }
};

const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/usuarios`);
  return response.data;
};

const postUsers = async (data: User) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios`, data);
    return response.status;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

const login = async (email: string, password: string) => {
  const users = await getUsers();
  const foundUser = users.find((user: User) => user.email === email && user.senha === password);
  return foundUser;
};

const updateUser = async (user: User) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/usuarios/${user.id}`, user);
    return response.status;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

const api = {
  empresa: {
    get: getEmpresa,
  },
  users: {
    get: getUsers,
    post: postUsers,
  },
  login: login,
  updateUser: updateUser,
};

export default api;
