import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const MetricCard = ({ label, value, icon, color }) => (
  <Card style={[styles.metricCard, { borderTopColor: color }]} elevation={2}>
    <Card.Content style={styles.metricContent}>
      <Text variant="displaySmall" style={styles.metricIcon}>{icon}</Text>
      <Text variant="bodySmall" style={styles.metricLabel}>{label}</Text>
      <Text variant="headlineMedium" style={[styles.metricValue, { color }]}>
        {value}
      </Text>
    </Card.Content>
  </Card>
);

export const MetricsGrid = ({ 
  averageLevel, 
  riverbankLevel, 
  maxLevel, 
  numSteps 
}) => {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        สรุปผลการวิเคราะห์
      </Text>
      
      <View style={styles.grid}>
        <View style={styles.row}>
          <View style={styles.col}>
            <MetricCard 
              icon="📊"
              label="ระดับน้ำเฉลี่ย" 
              value={`${averageLevel.toFixed(2)} ม.`}
              color="#0EA5E9"
            />
          </View>
          <View style={styles.col}>
            <MetricCard 
              icon="🏔️"
              label="ระดับตลิ่ง" 
              value={`${riverbankLevel.toFixed(2)} ม.`}
              color="#8B5CF6"
            />
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={styles.col}>
            <MetricCard 
              icon="⬆️"
              label="ระดับสูงสุด" 
              value={`${maxLevel.toFixed(2)} ม.`}
              color="#EF4444"
            />
          </View>
          <View style={styles.col}>
            <MetricCard 
              icon="📍"
              label="จุดวัด" 
              value={`${numSteps} จุด`}
              color="#10B981"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Prompt_700Bold',
    color: '#0F172A',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  grid: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  col: {
    flex: 1,
  },
  metricCard: {
    backgroundColor: '#fff',
    borderTopWidth: 4,
  },
  metricContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  metricIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  metricLabel: {
    fontFamily: 'Prompt_400Regular',
    color: '#64748B',
    marginBottom: 8,
    textAlign: 'center',
  },
  metricValue: {
    fontFamily: 'Prompt_700Bold',
  },
});
