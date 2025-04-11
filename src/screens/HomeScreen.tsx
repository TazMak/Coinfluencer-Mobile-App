import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CoinItem from '../components/CoinItem';
import WalletConnect from '../components/WalletConnect';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { fetchCoins } from '../services/api';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCoins = async () => {
      try {
        setLoading(true);
        // In a real app, this would be a real API call
        const data = await fetchCoins();
        setCoins(data);
        setError(null);
      } catch (err) {
        setError('Failed to load coins. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCoins();
  }, []);

  const handleCoinPress = (coinId: number) => {
    navigation.navigate('CoinDetail', { coinId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coinfluencer</Text>
      </View>
      
      <WalletConnect />
      
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Featured Influencer Tokens</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={coins}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CoinItem 
                coin={item} 
                onPress={() => handleCoinPress(item.id)} 
              />
            )}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
