import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

interface HolderDistributionProps {
  data: {
    address: string;
    percentage: number;
    color: string;
    name?: string;
  }[];
}

const HolderDistribution: React.FC<HolderDistributionProps> = ({ data }) => {
  // Prepare data in the format required by PieChart
  const chartData = data.map((item) => ({
    name: item.name || item.address.substring(0, 6) + '...',
    percentage: item.percentage,
    color: item.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Holder Distribution</Text>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="percentage"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default HolderDistribution;
