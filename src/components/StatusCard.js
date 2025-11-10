import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../styles/theme';

export const StatusCard = ({ isFlooding }) => {
  return (
    <View style={[
      styles.container,
      isFlooding ? styles.flooding : styles.safe
    ]}>
      <Text style={styles.icon}>
        {isFlooding ? '🚨' : '✅'}
      </Text>
      <Text style={styles.title}>
        {isFlooding ? 'มีโอกาสเกิดน้ำท่วม' : 'สถานการณ์ปกติ'}
      </Text>
      <Text style={styles.description}>
        {isFlooding 
          ? 'ระดับน้ำสูงกว่าระดับตลิ่ง' 
          : 'ระดับน้ำอยู่ในเกณฑ์ปกติ'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: spacing.md,
    padding: spacing.xl,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.medium,
  },
  flooding: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 5,
    borderLeftColor: colors.danger,
  },
  safe: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 5,
    borderLeftColor: colors.success,
  },
  icon: {
    fontSize: fontSize.huge,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
    color: colors.text.primary,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
});
