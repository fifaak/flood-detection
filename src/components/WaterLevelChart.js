import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../styles/theme';

export const WaterLevelChart = ({ waterLevels, riverbankLevel, numSteps }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>กราฟระดับน้ำ</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <LineChart
          data={{
            labels: Array.from({ length: numSteps + 1 }, (_, i) => i.toString()),
            datasets: [
              {
                data: waterLevels,
                color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
                strokeWidth: 3,
              },
              {
                data: Array(numSteps + 1).fill(riverbankLevel),
                color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
                strokeWidth: 2,
                withDots: false,
              },
            ],
            legend: ['ระดับน้ำที่คาดการณ์', 'ระดับตลิ่ง'],
          }}
          width={Dimensions.get('window').width + 200}
          height={250}
          chartConfig={{
            backgroundColor: colors.white,
            backgroundGradientFrom: colors.white,
            backgroundGradientTo: colors.white,
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: borderRadius.lg,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
            },
          }}
          bezier
          style={styles.chart}
        />
      </ScrollView>
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
          <Text style={styles.legendText}>ระดับน้ำที่คาดการณ์</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.danger }]} />
          <Text style={styles.legendText}>ระดับตลิ่ง</Text>
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
  chart: {
    marginVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
    gap: spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  legendText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
});
