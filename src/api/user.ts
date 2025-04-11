import api from './axios';

export const getProfile = async () => {
  return await api.get('/users/profile');
};

export const getPortfolio = async () => {
  return await api.get('/users/portfolio');
};
