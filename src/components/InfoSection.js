import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../styles/theme';

export const InfoSection = ({ selectedYear, numSteps, deltaX }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ข้อมูลเพิ่มเติม</Text>
      <Text style={styles.text}>
        • การคาดการณ์นี้ใช้ข้อมูลจากปี {selectedYear}
      </Text>
      <Text style={styles.text}>
        • คำนวณระดับน้ำในระยะทาง {(numSteps * deltaX).toLocaleString()} เมตร
      </Text>
      <Text style={styles.text}>
        • แบ่งเป็น {numSteps} ช่วง ช่วงละ {deltaX} เมตร
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    margin: spacing.md,
    marginBottom: spacing.xxl,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    ...shadows.small,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  text: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
});
