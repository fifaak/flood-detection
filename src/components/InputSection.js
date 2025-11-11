import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text, Divider, TextInput, Chip } from 'react-native-paper';
import Slider from '@react-native-community/slider';

export const InputSection = ({ 
  selectedYear, 
  onYearChange, 
  riverbankLevel, 
  onRiverbankChange,
  yearOptions,
  riverbankOptions 
}) => {
  const [inputValue, setInputValue] = useState(riverbankLevel.toString());
  const [sliderValue, setSliderValue] = useState(riverbankLevel);

  const handleInputChange = (text) => {
    setInputValue(text);
    const numValue = parseFloat(text);
    if (!isNaN(numValue) && numValue >= 0.5 && numValue <= 5.0) {
      setSliderValue(numValue);
      onRiverbankChange(numValue);
    }
  };

  const handleSliderChange = (value) => {
    const roundedValue = Math.round(value * 10) / 10;
    setSliderValue(roundedValue);
    setInputValue(roundedValue.toFixed(1));
    onRiverbankChange(roundedValue);
  };

  const handlePresetClick = (value) => {
    setSliderValue(value);
    setInputValue(value.toFixed(1));
    onRiverbankChange(value);
  };

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.icon}>⚙️</Text>
          <Text variant="titleLarge" style={styles.title}>ตั้งค่าการคำนวณ</Text>
        </View>
        
        <Divider style={styles.divider} />
        
        {/* Year Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="bodyMedium" style={styles.sectionIcon}>📅</Text>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              ปีข้อมูลอุทกวิทยา
            </Text>
          </View>
          
          <View style={styles.yearGrid}>
            {yearOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => onYearChange(option.value)}
                style={styles.yearButton}
              >
                <Card 
                  style={[
                    styles.yearCard,
                    selectedYear === option.value && styles.yearCardSelected
                  ]}
                  elevation={selectedYear === option.value ? 4 : 1}
                >
                  <Card.Content style={styles.yearContent}>
                    <Text 
                      variant="labelSmall" 
                      style={[
                        styles.yearLabel,
                        selectedYear === option.value && styles.yearLabelSelected
                      ]}
                    >
                      พ.ศ.
                    </Text>
                    <Text 
                      variant="headlineMedium" 
                      style={[
                        styles.yearValue,
                        selectedYear === option.value && styles.yearValueSelected
                      ]}
                    >
                      {option.value}
                    </Text>
                    {selectedYear === option.value && (
                      <View style={styles.checkmark}>
                        <Text style={styles.checkmarkText}>✓</Text>
                      </View>
                    )}
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.infoBox}>
            <Text variant="bodyMedium" style={styles.infoIcon}>ℹ️</Text>
            <Text variant="bodySmall" style={styles.infoText}>
              เลือกปีข้อมูลที่ต้องการวิเคราะห์
            </Text>
          </View>
        </View>

        {/* Riverbank Level */}
        <View style={styles.section}>
          <View style={styles.levelHeader}>
            <View style={styles.levelHeaderLeft}>
              <Text variant="bodyMedium" style={styles.sectionIcon}>📏</Text>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                ระดับตลิ่งอ้างอิง
              </Text>
            </View>
            <Chip 
              mode="flat" 
              style={styles.valueChip}
              textStyle={styles.valueChipText}
            >
              {sliderValue.toFixed(1)} ม.
            </Chip>
          </View>

          {/* Slider */}
          <View style={styles.sliderContainer}>
            <Slider
              value={sliderValue}
              onValueChange={handleSliderChange}
              minimumValue={0.5}
              maximumValue={5.0}
              step={0.1}
              minimumTrackTintColor="#0EA5E9"
              maximumTrackTintColor="#E2E8F0"
              thumbTintColor="#0EA5E9"
              style={styles.slider}
            />
            <View style={styles.sliderLabels}>
              <Text variant="labelSmall" style={styles.sliderLabel}>0.5 ม.</Text>
              <Text variant="labelSmall" style={styles.sliderLabel}>5.0 ม.</Text>
            </View>
          </View>

          {/* Quick Presets */}
          <View style={styles.presetsSection}>
            <Text variant="bodySmall" style={styles.presetsTitle}>
              ค่าที่แนะนำ:
            </Text>
            <View style={styles.presetsGrid}>
              {[1.5, 2.0, 2.5, 3.0, 3.5, 4.0].map((preset) => (
                <TouchableOpacity
                  key={preset}
                  onPress={() => handlePresetClick(preset)}
                >
                  <Chip
                    mode={sliderValue === preset ? 'flat' : 'outlined'}
                    selected={sliderValue === preset}
                    style={[
                      styles.presetChip,
                      sliderValue === preset && styles.presetChipSelected
                    ]}
                    textStyle={[
                      styles.presetChipText,
                      sliderValue === preset && styles.presetChipTextSelected
                    ]}
                  >
                    {preset.toFixed(1)} ม.
                  </Chip>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Manual Input */}
          <View style={styles.inputSection}>
            <Text variant="bodySmall" style={styles.inputLabel}>
              หรือกรอกค่าเอง:
            </Text>
            <View style={styles.inputRow}>
              <TextInput
                value={inputValue}
                onChangeText={handleInputChange}
                keyboardType="decimal-pad"
                placeholder="0.5 - 5.0"
                mode="outlined"
                style={styles.textInput}
                dense
              />
              <View style={styles.unitBox}>
                <Text variant="bodyMedium" style={styles.unitText}>เมตร</Text>
              </View>
            </View>
            <Text variant="labelSmall" style={styles.inputHint}>
              💡 ระบุค่าระหว่าง 0.5 - 5.0 เมตร
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontFamily: 'Prompt_700Bold',
    color: '#0F172A',
  },
  divider: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontFamily: 'Prompt_600SemiBold',
    color: '#334155',
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  yearButton: {
    marginBottom: 4,
  },
  yearCard: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    minWidth: 100,
  },
  yearCardSelected: {
    backgroundColor: '#0EA5E9',
    borderColor: '#0EA5E9',
  },
  yearContent: {
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  yearLabel: {
    fontFamily: 'Prompt_500Medium',
    color: '#64748B',
    opacity: 0.8,
    marginBottom: 4,
  },
  yearLabelSelected: {
    color: '#fff',
  },
  yearValue: {
    fontFamily: 'Prompt_700Bold',
    color: '#0F172A',
  },
  yearValueSelected: {
    color: '#fff',
  },
  checkmark: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#10B981',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Prompt_400Regular',
    color: '#1E40AF',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueChip: {
    backgroundColor: '#EFF6FF',
  },
  valueChipText: {
    fontFamily: 'Prompt_700Bold',
    color: '#0EA5E9',
    fontSize: 18,
  },
  sliderContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sliderLabel: {
    fontFamily: 'Prompt_400Regular',
    color: '#64748B',
  },
  presetsSection: {
    marginTop: 8,
    gap: 8,
  },
  presetsTitle: {
    fontFamily: 'Prompt_600SemiBold',
    color: '#475569',
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetChip: {
    borderColor: '#E2E8F0',
  },
  presetChipSelected: {
    backgroundColor: '#0EA5E9',
  },
  presetChipText: {
    fontFamily: 'Prompt_600SemiBold',
    color: '#334155',
  },
  presetChipTextSelected: {
    color: '#fff',
  },
  inputSection: {
    marginTop: 16,
    gap: 8,
  },
  inputLabel: {
    fontFamily: 'Prompt_600SemiBold',
    color: '#475569',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    fontFamily: 'Prompt_500Medium',
  },
  unitBox: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  unitText: {
    fontFamily: 'Prompt_600SemiBold',
    color: '#334155',
  },
  inputHint: {
    fontFamily: 'Prompt_400Regular',
    color: '#64748B',
  },
});
