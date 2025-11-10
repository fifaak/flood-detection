import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, fontSize, fontWeight } from '../styles/theme';

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.icon}>🌊</Text>
      <Text style={styles.title}>คาดการณ์ระดับน้ำ</Text>
      <Text style={styles.subtitle}>แบบจำลองคาดการณ์น้ำท่วม</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    padding: spacing.xxl,
    alignItems: 'center',
  },
  icon: {
    fontSize: fontSize.huge,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.white,
    opacity: 0.9,
  },
});
