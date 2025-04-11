import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserProfile from '../components/UserProfile';

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserProfile />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default ProfileScreen;
