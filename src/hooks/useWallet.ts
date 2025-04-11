import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet, disconnectWallet } from '../store/authSlice';
import { RootState } from '../store/store';
import { Alert } from 'react-native';

export const useWallet = () => {
  const dispatch = useDispatch();
  const { walletAddress, isConnecting } = useSelector((state: RootState) => state.auth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkWalletStatus = async () => {
      // In a real app, check if there's an existing wallet connection
      setIsReady(true);
    };

    checkWalletStatus();
  }, []);

  const connect = async () => {
    try {
      // For demo purposes, simulate a wallet connection
      const mockWalletAddress = '0x' + Math.random().toString(16).substr(2, 40);
      dispatch(connectWallet(mockWalletAddress));
    } catch (error) {
      Alert.alert('Connection Error', 'Failed to connect wallet');
      console.error('Wallet connection error:', error);
    }
  };

  const disconnect = () => {
    try {
      dispatch(disconnectWallet());
    } catch (error) {
      console.error('Wallet disconnection error:', error);
    }
  };

  return {
    walletAddress,
    isConnecting,
    isReady,
    connect,
    disconnect,
  };
};
