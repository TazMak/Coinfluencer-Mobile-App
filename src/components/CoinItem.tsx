import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './common/Card';

interface CoinItemProps {
  coin: {
    id: number;
    name: string;
    symbol: string;
    price?: number;
    change24h?: number;
  };
  onPress: () => void;
}

const CoinItem: React.FC<CoinItemProps> = ({ coin, onPress }) => {
  const { name, symbol, price = 0, change24h = 0 } = coin;

  const isPositiveChange = change24h >= 0;

  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <View style={styles.container}>
          <View style={styles.leftContent}>
            <Text style={styles.symbol}>{symbol}</Text>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            <Text
              style={[
                styles.change,
                isPositiveChange ? styles.positive : styles.negative,
              ]}
            >
              {isPositiveChange ? '+' : ''}
              {change24h.toFixed(2)}%
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  change: {
    fontSize: 14,
    marginTop: 4,
  },
  positive: {
    color: '#2ecc71',
  },
  negative: {
    color: '#e74c3c',
  },
});

export default CoinItem;
