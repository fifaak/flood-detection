import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Text, Chip } from 'react-native-paper';
import { 
  StatusCard, 
  MetricsGrid, 
  WaterLevelChart, 
  InfoSection 
} from '../components';
import { calculateFloodPrediction } from '../utils/calculations';
import { 
  RAW_DATA,
  G_CONSTANT,
  Z_BED,
  DELTA_X,
  NUM_STEPS
} from '../constants/floodData';

export const ResultsScreen = ({ route, navigation }) => {
  const { selectedYear, riverbankLevel } = route.params;
  const [results, setResults] = useState(null);

  useEffect(() => {
    const rawData = RAW_DATA[selectedYear];
    const prediction = calculateFloodPrediction(
      rawData,
      G_CONSTANT,
      Z_BED,
      DELTA_X,
      NUM_STEPS,
      riverbankLevel
    );
    setResults(prediction);
  }, [selectedYear, riverbankLevel]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.headerTitle}>
            ผลการวิเคราะห์
          </Text>
          <View style={styles.headerChips}>
            <Chip 
              mode="flat" 
              style={styles.chip}
              textStyle={styles.chipText}
            >
              ปี {selectedYear}
            </Chip>
            <Chip 
              mode="flat" 
              style={styles.chip}
              textStyle={styles.chipText}
            >
              ตลิ่ง {riverbankLevel.toFixed(1)} ม.
            </Chip>
          </View>
        </View>

        {results && (
          <>
            <StatusCard isFlooding={results.isFlooding} />
            
            <MetricsGrid
              averageLevel={results.W_average}
              riverbankLevel={riverbankLevel}
              maxLevel={results.maxLevel}
              numSteps={NUM_STEPS}
            />

            <WaterLevelChart
              waterLevels={results.W_levels}
              riverbankLevel={riverbankLevel}
              numSteps={NUM_STEPS}
            />

            <InfoSection
              selectedYear={selectedYear}
              numSteps={NUM_STEPS}
              deltaX={DELTA_X}
            />

            {/* Action Button */}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => navigation.goBack()}
                style={styles.button}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
                elevation={4}
              >
                🔄  คำนวณใหม่
              </Button>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#0EA5E9',
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontFamily: 'Prompt_700Bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerChips: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  chipText: {
    fontFamily: 'Prompt_500Medium',
    color: '#fff',
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  button: {
    borderRadius: 12,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontFamily: 'Prompt_700Bold',
    fontSize: 16,
  },
});
