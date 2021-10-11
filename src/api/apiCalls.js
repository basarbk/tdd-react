import axios from 'axios';
import i18n from '../locale/i18n';

export const signUp = (body) => {
  return axios.post('/api/1.0/users', body, {
    headers: {
      'Accept-Language': i18n.language
    }
  });
};

export const activate = (token) => {
  return axios.post('/api/1.0/users/token/' + token);
};

export const loadUsers = (page) => {
  return axios.get('/api/1.0/users', { params: { page, size: 3 } });
};
