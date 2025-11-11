import React from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { CustomLineChart } from './CustomLineChart';

export const WaterLevelChart = ({ waterLevels, riverbankLevel, numSteps }) => {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = Math.max(screenWidth + 100, (numSteps + 1) * 50);
  
  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.icon}>📈</Text>
          <View style={styles.headerText}>
            <Text variant="titleLarge" style={styles.title}>กราฟระดับน้ำ</Text>
            <Text variant="bodyMedium" style={styles.subtitle}>แสดงการเปลี่ยนแปลงตามระยะทาง</Text>
          </View>
        </View>
        
        <Divider style={styles.divider} />
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          style={styles.scrollView}
        >
          <CustomLineChart
            data={waterLevels}
            riverbankLevel={riverbankLevel}
            width={chartWidth}
            height={280}
            numSteps={numSteps}
          />
        </ScrollView>
        
        <Divider style={styles.divider} />
        
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#0EA5E9' }]} />
            <Text variant="bodySmall" style={styles.legendText}>ระดับน้ำที่คาดการณ์</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#EF4444' }]} />
            <Text variant="bodySmall" style={styles.legendText}>ระดับตลิ่ง</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text variant="bodyMedium" style={styles.infoIcon}>💡</Text>
          <Text variant="bodySmall" style={styles.infoText}>
            เลื่อนกราฟไปทางขวาเพื่อดูข้อมูลทั้งหมด
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: 'Prompt_700Bold',
    color: '#0F172A',
  },
  subtitle: {
    fontFamily: 'Prompt_400Regular',
    color: '#64748B',
  },
  divider: {
    marginVertical: 16,
  },
  scrollView: {
    marginVertical: 8,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendBox: {
    width: 24,
    height: 4,
    borderRadius: 2,
  },
  legendText: {
    fontFamily: 'Prompt_500Medium',
    color: '#334155',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Prompt_400Regular',
    color: '#475569',
  },
});
