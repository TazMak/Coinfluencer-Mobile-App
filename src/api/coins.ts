import api from './axios';

export const getCoins = async () => {
  return await api.get('/coins');
};

export const getCoin = async (id: number) => {
  return await api.get(`/coins/${id}`);
};

export const createCoin = async (data: { name: string; symbol: string; supply: number }) => {
  return await api.post('/coins', data);
};

export const buyCoin = async (coinId: number, amount: string) => {
  return await api.post(`/coins/${coinId}/buy`, { amount });
};

export const sellCoin = async (coinId: number, amount: string) => {
  return await api.post(`/coins/${coinId}/sell`, { amount });
};
