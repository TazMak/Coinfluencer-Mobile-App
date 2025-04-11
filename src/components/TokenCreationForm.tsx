import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const TokenCreationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { walletAddress } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async () => {
    if (!walletAddress) {
      Alert.alert('Error', 'Please connect your wallet first');
      return;
    }

    if (!name || !symbol || !initialSupply) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (isNaN(Number(initialSupply)) || Number(initialSupply) <= 0) {
      Alert.alert('Error', 'Initial supply must be a positive number');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would call an API to create the token
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert('Success', 'Your token has been created successfully!');
      
      // Reset form
      setName('');
      setSymbol('');
      setInitialSupply('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create token. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Influencer Token</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Token Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g., My Influencer Token"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Token Symbol</Text>
        <TextInput
          style={styles.input}
          value={symbol}
          onChangeText={setSymbol}
          placeholder="e.g., MIT"
          maxLength={6}
          autoCapitalize="characters"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Initial Supply</Text>
        <TextInput
          style={styles.input}
          value={initialSupply}
          onChangeText={setInitialSupply}
          placeholder="e.g., 1000000"
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Token Features:</Text>
        <Text style={styles.infoText}>• 10% maximum ownership per wallet</Text>
        <Text style={styles.infoText}>• Basic anti-dump protection</Text>
        <Text style={styles.infoText}>• Creator receives initial supply</Text>
      </View>
      
      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Creating...' : 'Create Token'}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
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
  infoContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    marginBottom: 4,
    color: '#555',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TokenCreationForm;
