import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { disconnectWallet } from '../store/authSlice';
import { shortenAddress } from '../utils/helpers';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const { walletAddress } = useSelector((state: RootState) => state.auth);
  
  // Mocked data for user profile
  const userTokens = 3;
  const totalHoldings = '$12,345.67';
  
  const handleDisconnect = () => {
    dispatch(disconnectWallet());
  };
  
  if (!walletAddress) {
    return (
      <View style={styles.container}>
        <Text style={styles.noWalletText}>Connect your wallet to view your profile</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Profile</Text>
        <TouchableOpacity style={styles.disconnectButton} onPress={handleDisconnect}>
          <Text style={styles.disconnectText}>Disconnect</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.label}>Wallet Address</Text>
        <Text style={styles.value}>{shortenAddress(walletAddress)}</Text>
      </View>
      
      <View style={styles.row}>
        <View style={[styles.card, styles.halfCard]}>
          <Text style={styles.label}>Your Tokens</Text>
          <Text style={styles.value}>{userTokens}</Text>
        </View>
        
        <View style={[styles.card, styles.halfCard]}>
          <Text style={styles.label}>Total Holdings</Text>
          <Text style={styles.value}>{totalHoldings}</Text>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>My Tokens</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Transaction History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.createButton]}>
          <Text style={styles.createButtonText}>Create New Token</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  disconnectButton: {
    backgroundColor: '#f1c40f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  disconnectText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCard: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  createButton: {
    backgroundColor: '#3498db',
  },
  createButtonText: {
    color: '#fff',
  },
  noWalletText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
export default UserProfile;
