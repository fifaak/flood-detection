import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { Header } from '../components/Header';
import { InputSection } from '../components/InputSection';
import { YEAR_OPTIONS, RIVERBANK_OPTIONS } from '../constants/floodData';

export const SettingsScreen = ({ navigation }) => {
  const [selectedYear, setSelectedYear] = useState(2564);
  const [riverbankLevel, setRiverbankLevel] = useState(2.0);

  const handleCalculate = () => {
    navigation.navigate('Results', {
      selectedYear,
      riverbankLevel,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text variant="headlineMedium" style={styles.title}>
              ตั้งค่าการคำนวณ
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              กรุณาเลือกข้อมูลที่ต้องการวิเคราะห์
            </Text>
          </View>
          
          <InputSection
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            riverbankLevel={riverbankLevel}
            onRiverbankChange={setRiverbankLevel}
            yearOptions={YEAR_OPTIONS}
            riverbankOptions={RIVERBANK_OPTIONS}
          />

          {/* Info Cards */}
          <View style={styles.infoCards}>
            <Card style={[styles.infoCard, styles.blueCard]} elevation={1}>
              <Card.Content style={styles.infoCardContent}>
                <Text variant="bodyMedium" style={styles.infoIcon}>📊</Text>
                <View style={styles.infoTextContainer}>
                  <Text variant="titleSmall" style={styles.infoCardTitle}>
                    ข้อมูลที่เลือก
                  </Text>
                  <Text variant="bodySmall" style={styles.infoCardText}>
                    ปี {selectedYear} • ระดับตลิ่ง {riverbankLevel.toFixed(1)} เมตร
                  </Text>
                </View>
              </Card.Content>
            </Card>

            <Card style={[styles.infoCard, styles.purpleCard]} elevation={1}>
              <Card.Content style={styles.infoCardContent}>
                <Text variant="bodyMedium" style={styles.infoIcon}>🔬</Text>
                <View style={styles.infoTextContainer}>
                  <Text variant="titleSmall" style={styles.infoCardTitle}>
                    วิธีการคำนวณ
                  </Text>
                  <Text variant="bodySmall" style={styles.infoCardText}>
                    Saint-Venant Equation • Euler's Method
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </View>

          {/* Calculate Button */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleCalculate}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              elevation={4}
            >
              🧮  คำนวณและวิเคราะห์
            </Button>
          </View>

          {/* Additional Info */}
          <Card style={styles.aboutCard} elevation={1}>
            <Card.Content>
              <View style={styles.aboutHeader}>
                <Text variant="bodyMedium" style={styles.aboutIcon}>💡</Text>
                <Text variant="titleLarge" style={styles.aboutTitle}>
                  เกี่ยวกับการคำนวณ
                </Text>
              </View>
              
              <View style={styles.aboutList}>
                <View style={styles.aboutItem}>
                  <Text variant="bodyMedium" style={styles.bullet}>•</Text>
                  <Text variant="bodyMedium" style={styles.aboutText}>
                    ระบบจะคำนวณระดับน้ำในระยะทาง 7,000 เมตร
                  </Text>
                </View>
                
                <View style={styles.aboutItem}>
                  <Text variant="bodyMedium" style={styles.bullet}>•</Text>
                  <Text variant="bodyMedium" style={styles.aboutText}>
                    แบ่งเป็น 14 ช่วง ช่วงละ 500 เมตร
                  </Text>
                </View>
                
                <View style={styles.aboutItem}>
                  <Text variant="bodyMedium" style={styles.bullet}>•</Text>
                  <Text variant="bodyMedium" style={styles.aboutText}>
                    ใช้ข้อมูลอุทกวิทยาจริงจากแม่น้ำในจังหวัดสระบุรี
                  </Text>
                </View>
                
                <View style={styles.aboutItem}>
                  <Text variant="bodyMedium" style={styles.bullet}>•</Text>
                  <Text variant="bodyMedium" style={styles.aboutText}>
                    ผลลัพธ์จะแสดงโอกาสการเกิดน้ำท่วมและกราฟวิเคราะห์
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingBottom: 32,
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 4,
  },
  title: {
    fontFamily: 'Prompt_700Bold',
    color: '#0F172A',
  },
  subtitle: {
    fontFamily: 'Prompt_400Regular',
    color: '#64748B',
  },
  infoCards: {
    paddingHorizontal: 16,
    marginTop: 8,
    gap: 12,
  },
  infoCard: {
    borderLeftWidth: 4,
  },
  blueCard: {
    backgroundColor: '#EFF6FF',
    borderLeftColor: '#0EA5E9',
  },
  purpleCard: {
    backgroundColor: '#F5F3FF',
    borderLeftColor: '#8B5CF6',
  },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoTextContainer: {
    flex: 1,
    gap: 4,
  },
  infoCardTitle: {
    fontFamily: 'Prompt_600SemiBold',
    color: '#1E293B',
  },
  infoCardText: {
    fontFamily: 'Prompt_400Regular',
    color: '#475569',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  button: {
    borderRadius: 12,
  },
  buttonContent: {
    height: 64,
  },
  buttonLabel: {
    fontFamily: 'Prompt_700Bold',
    fontSize: 18,
  },
  aboutCard: {
    marginHorizontal: 16,
    marginBottom: 32,
    backgroundColor: '#fff',
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  aboutIcon: {
    fontSize: 20,
  },
  aboutTitle: {
    fontFamily: 'Prompt_700Bold',
    color: '#0F172A',
  },
  aboutList: {
    gap: 12,
  },
  aboutItem: {
    flexDirection: 'row',
    gap: 8,
  },
  bullet: {
    fontFamily: 'Prompt_400Regular',
    color: '#334155',
  },
  aboutText: {
    flex: 1,
    fontFamily: 'Prompt_400Regular',
    color: '#334155',
    lineHeight: 22,
  },
});
