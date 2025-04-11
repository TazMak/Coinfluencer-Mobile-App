import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { fetchCoinDetail } from '../services/api';
import PriceChart from '../components/PriceChart';
import TransactionForm from '../components/TransactionForm';
import HolderDistribution from '../components/HolderDistribution';

type CoinDetailRouteProp = RouteProp<RootStackParamList, 'CoinDetail'>;

const CoinDetailScreen: React.FC = () => {
  const route = useRoute<CoinDetailRouteProp>();
  const navigation = useNavigation();
  const { coinId } = route.params;
  
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      try {
        setLoading(true);
        // In a real app, this would be a real API call
        const data = await fetchCoinDetail(coinId);
        setCoin(data);
        setError(null);
      } catch (err) {
        setError('Failed to load coin details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCoinDetail();
  }, [coinId]);

  useEffect(() => {
    if (coin) {
      navigation.setOptions({ title: coin.name });
    }
  }, [coin, navigation]);

  // Sample holder distribution data
  const holderData = [
    { address: '0x1234...', percentage: 20, color: '#f39c12', name: 'Creator' },
    { address: '0x5678...', percentage: 15, color: '#3498db', name: 'Top Holder' },
    { address: '0x9abc...', percentage: 10, color: '#2ecc71', name: 'Holder 3' },
    { address: '0xdef0...', percentage: 8, color: '#9b59b6', name: 'Holder 4' },
    { address: '0x1122...', percentage: 5, color: '#e74c3c', name: 'Holder 5' },
    { address: 'Others', percentage: 42, color: '#95a5a6', name: 'Others' },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </SafeAreaView>
    );
  }

  if (error || !coin) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Coin not found'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.tokenInfo}>
            <Text style={styles.symbol}>{coin.symbol}</Text>
            <Text style={styles.name}>{coin.name}</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.price}>${coin.price.toFixed(2)}</Text>
            <Text 
              style={[
                styles.priceChange, 
                coin.change24h >= 0 ? styles.positive : styles.negative
              ]}
            >
              {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
            </Text>
          </View>
        </View>

        <PriceChart 
          data={coin.priceHistory}
          labels={coin.priceHistoryLabels}
          title="7-Day Price History"
        />

        <TransactionForm
          coinId={coin.id}
          coinSymbol={coin.symbol}
          currentPrice={coin.price}
        />

        <HolderDistribution data={holderData} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tokenInfo: {
    flex: 1,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    color: '#666',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  priceChange: {
    fontSize: 16,
  },
  positive: {
    color: '#2ecc71',
  },
  negative: {
    color: '#e74c3c',
  },
});

export default CoinDetailScreen;
