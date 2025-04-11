import api from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../utils/constants';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  
  // Store token and user in AsyncStorage
  await AsyncStorage.setItem(TOKEN_STORAGE_KEY, response.data.access_token);
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.data.user));
  
  return response.data;
};

export const register = async (email: string, password: string, role: string) => {
  const response = await api.post('/auth/register', { email, password, role });
  
  // Store token and user in AsyncStorage
  await AsyncStorage.setItem(TOKEN_STORAGE_KEY, response.data.access_token);
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.data.user));
  
  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  await AsyncStorage.removeItem(USER_STORAGE_KEY);
};

export const updateWalletAddress = async (walletAddress: string) => {
  const response = await api.patch('/users/wallet', { walletAddress });
  
  // Update user in AsyncStorage
  const userString = await AsyncStorage.getItem(USER_STORAGE_KEY);
  if (userString) {
    const user = JSON.parse(userString);
    user.walletAddress = walletAddress;
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
  
  return response.data;
};
