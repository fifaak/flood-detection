import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export const InfoSection = ({ selectedYear, numSteps, deltaX }) => {
  const totalDistance = numSteps * deltaX;
  
  return (
    <Card style={styles.card} elevation={1}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="bodyMedium" style={styles.icon}>💡</Text>
          <Text variant="titleLarge" style={styles.title}>
            เกี่ยวกับการคำนวณ
          </Text>
        </View>
        
        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <Text variant="bodyMedium" style={styles.bullet}>•</Text>
            <Text variant="bodyMedium" style={styles.infoText}>
              ระบบจะคำนวณระดับน้ำในระยะทาง {totalDistance.toLocaleString()} เมตร
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text variant="bodyMedium" style={styles.bullet}>•</Text>
            <Text variant="bodyMedium" style={styles.infoText}>
              แบ่งเป็น {numSteps} ช่วง ช่วงละ {deltaX} เมตร
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text variant="bodyMedium" style={styles.bullet}>•</Text>
            <Text variant="bodyMedium" style={styles.infoText}>
              ใช้ข้อมูลอุทกวิทยาจริงจากแม่น้ำในจังหวัดสระบุรี
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text variant="bodyMedium" style={styles.bullet}>•</Text>
            <Text variant="bodyMedium" style={styles.infoText}>
              ผลลัพธ์จะแสดงโอกาสการเกิดน้ำท่วมและกราฟวิเคราะห์
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
    marginBottom: 32,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontFamily: 'Prompt_700Bold',
    color: '#0F172A',
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    gap: 8,
  },
  bullet: {
    fontFamily: 'Prompt_400Regular',
    color: '#334155',
  },
  infoText: {
    flex: 1,
    fontFamily: 'Prompt_400Regular',
    color: '#334155',
    lineHeight: 22,
  },
});
