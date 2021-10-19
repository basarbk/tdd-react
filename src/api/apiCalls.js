import axios from 'axios';
import i18n from '../locale/i18n';
import { store } from '../state/store';

axios.interceptors.request.use((request) => {
  request.headers['Accept-Language'] = i18n.language;
  const { header } = store.getState();
  if (header) {
    request.headers['Authorization'] = header;
  }
  return request;
});

export const signUp = (body) => {
  return axios.post('/api/1.0/users', body);
};

export const activate = (token) => {
  return axios.post('/api/1.0/users/token/' + token);
};

export const loadUsers = (page) => {
  return axios.get('/api/1.0/users', { params: { page, size: 3 } });
};

export const getUserById = (id) => {
  return axios.get(`/api/1.0/users/${id}`);
};

export const login = (body) => {
  return axios.post('/api/1.0/auth', body);
};

export const updateUser = (id, body) => {
  return axios.put(`/api/1.0/users/${id}`, body);
};

export const logout = () => {
  return axios.post('/api/1.0/logout');
};

export const deleteUser = (id) => {
  return axios.delete(`/api/1.0/users/${id}`);
};
