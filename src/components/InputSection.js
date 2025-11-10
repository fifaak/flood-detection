import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../styles/theme';

export const InputSection = ({ 
  selectedYear, 
  onYearChange, 
  riverbankLevel, 
  onRiverbankChange,
  yearOptions,
  riverbankOptions 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>เลือกข้อมูล</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>ปีข้อมูล</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            value={selectedYear}
            onValueChange={onYearChange}
            items={yearOptions}
            style={pickerSelectStyles}
            placeholder={{}}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>ระดับตลิ่ง</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            value={riverbankLevel}
            onValueChange={onRiverbankChange}
            items={riverbankOptions}
            style={pickerSelectStyles}
            placeholder={{}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    ...shadows.medium,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.md,
    marginBottom: spacing.sm,
    color: colors.text.secondary,
    fontWeight: fontWeight.medium,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    backgroundColor: '#fafafa',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: fontSize.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    color: colors.text.primary,
  },
  inputAndroid: {
    fontSize: fontSize.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    color: colors.text.primary,
  },
});
