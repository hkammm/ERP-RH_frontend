import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

const getAuthHeaders = () => {
const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
const token = user.token;
const parsedToken = token ? JSON.parse(token).token : null;
  return parsedToken ? { Authorization: `Bearer ${parsedToken}` } : {};
};

export const createEmployee = async (data: any) => {
  const token = localStorage.getItem('token');
  const response = await axios.post('http://localhost:5000/api/employees', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllEmployees = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getMyEmployeeProfile = async () => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
