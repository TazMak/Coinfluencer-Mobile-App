import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TokenCreationForm from '../components/TokenCreationForm';
import WalletConnect from '../components/WalletConnect';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const CreateTokenScreen: React.FC = () => {
  const { walletAddress } = useSelector((state: RootState) => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerTitle}>Create Token</Text>
        
        {!walletAddress && (
          <View style={styles.walletContainer}>
            <Text style={styles.walletMessage}>Connect your wallet to create a token</Text>
            <WalletConnect />
          </View>
        )}
        
        {walletAddress && <TokenCreationForm />}
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>About Coinfluencer Tokens</Text>
          <Text style={styles.infoText}>
            Coinfluencer tokens are specially designed for influencers to safely connect with their community.
            Each token includes built-in protections:
          </Text>
          <Text style={styles.bulletPoint}>• Maximum ownership limit of 10% per wallet</Text>
          <Text style={styles.bulletPoint}>• Anti-dump protections to prevent market manipulation</Text>
          <Text style={styles.bulletPoint}>• Transparent holder distribution</Text>
          <Text style={styles.bulletPoint}>• Deployed on Polygon for low transaction fees</Text>
          <Text style={styles.infoText}>
            As the token creator, you'll receive the entire initial supply to distribute as you see fit.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  walletContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  walletMessage: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default CreateTokenScreen;
