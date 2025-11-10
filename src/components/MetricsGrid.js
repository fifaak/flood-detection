import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../styles/theme';

const MetricCard = ({ label, value }) => (
  <View style={styles.card}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export const MetricsGrid = ({ 
  averageLevel, 
  riverbankLevel, 
  maxLevel, 
  numSteps 
}) => {
  return (
    <>
      <View style={styles.row}>
        <MetricCard 
          label="ระดับน้ำเฉลี่ย" 
          value={`${averageLevel.toFixed(2)} ม.`} 
        />
        <MetricCard 
          label="ระดับตลิ่ง" 
          value={`${riverbankLevel.toFixed(2)} ม.`} 
        />
      </View>
      <View style={styles.row}>
        <MetricCard 
          label="ระดับน้ำสูงสุด" 
          value={`${maxLevel.toFixed(2)} ม.`} 
        />
        <MetricCard 
          label="จำนวนช่วง" 
          value={numSteps} 
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.small,
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
});
