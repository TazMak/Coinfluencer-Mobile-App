import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface TransactionFormProps {
  coinId: number;
  coinSymbol: string;
  currentPrice: number;
  onComplete?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  coinId, 
  coinSymbol, 
  currentPrice,
  onComplete 
}) => {
  const [amount, setAmount] = useState('');
  const [isBuying, setIsBuying] = useState(true);
  const { walletAddress } = useSelector((state: RootState) => state.auth);

  const totalCost = Number(amount) * currentPrice;

  const handleTransaction = () => {
    if (!walletAddress) {
      Alert.alert('Error', 'Please connect your wallet first');
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    // In a real app, this would call the API to process the transaction
    Alert.alert(
      'Success',
      `${isBuying ? 'Bought' : 'Sold'} ${amount} ${coinSymbol} for $${totalCost.toFixed(2)}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setAmount('');
            if (onComplete) onComplete();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, isBuying && styles.activeTab]}
          onPress={() => setIsBuying(true)}
        >
          <Text style={[styles.tabText, isBuying && styles.activeTabText]}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, !isBuying && styles.activeTab]}
          onPress={() => setIsBuying(false)}
        >
          <Text style={[styles.tabText, !isBuying && styles.activeTabText]}>Sell</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Amount ({coinSymbol})</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Price per {coinSymbol}</Text>
        <Text style={styles.priceText}>${currentPrice.toFixed(2)}</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.totalText}>
          ${isNaN(totalCost) ? '0.00' : totalCost.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isBuying ? styles.buyButton : styles.sellButton]}
        onPress={handleTransaction}
      >
        <Text style={styles.buttonText}>
          {isBuying ? 'Buy' : 'Sell'} {coinSymbol}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#3498db',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#555',
  },
  activeTabText: {
    color: '#fff',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#2ecc71',
  },
  sellButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TransactionForm;
