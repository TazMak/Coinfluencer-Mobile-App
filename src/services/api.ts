import { mockCoins } from '../data/mockData';

// Simulate API calls with mocked data and delays

export const fetchCoins = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mocked data
  return mockCoins;
};

export const fetchCoinDetail = async (coinId: number) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find coin by ID
  const coin = mockCoins.find(c => c.id === coinId);
  
  if (!coin) {
    throw new Error('Coin not found');
  }
  
  return coin;
};

export const createToken = async (
  name: string, 
  symbol: string, 
  initialSupply: number,
  creatorAddress: string
) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate token creation response
  return {
    id: mockCoins.length + 1,
    name,
    symbol,
    initialSupply,
    creatorAddress,
    contractAddress: '0x' + Math.random().toString(16).substr(2, 40),
    transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
  };
};
