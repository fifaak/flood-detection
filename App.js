import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { 
  Header, 
  InputSection, 
  StatusCard, 
  MetricsGrid, 
  WaterLevelChart, 
  InfoSection 
} from './src/components';
import { calculateFloodPrediction } from './src/utils/calculations';
import { 
  RAW_DATA, 
  YEAR_OPTIONS, 
  RIVERBANK_OPTIONS,
  G_CONSTANT,
  Z_BED,
  DELTA_X,
  NUM_STEPS
} from './src/constants/floodData';
import { colors } from './src/styles/theme';

export default function App() {
  const [selectedYear, setSelectedYear] = useState(2564);
  const [riverbankLevel, setRiverbankLevel] = useState(2.0);
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header />
        
        <InputSection
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          riverbankLevel={riverbankLevel}
          onRiverbankChange={setRiverbankLevel}
          yearOptions={YEAR_OPTIONS}
          riverbankOptions={RIVERBANK_OPTIONS}
        />

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
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
});
