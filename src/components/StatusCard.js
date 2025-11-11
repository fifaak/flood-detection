import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';

export const StatusCard = ({ isFlooding }) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isFlooding) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isFlooding]);

  return (
    <Card 
      style={[
        styles.card,
        { borderLeftColor: isFlooding ? '#EF4444' : '#10B981' }
      ]} 
      elevation={4}
    >
      <Card.Content style={styles.content}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Text variant="displayLarge" style={styles.emoji}>
            {isFlooding ? '🚨' : '✅'}
          </Text>
        </Animated.View>
        
        <Chip 
          mode="flat"
          style={[
            styles.chip,
            { backgroundColor: isFlooding ? '#FEE2E2' : '#D1FAE5' }
          ]}
          textStyle={[
            styles.chipText,
            { color: isFlooding ? '#991B1B' : '#065F46' }
          ]}
        >
          {isFlooding ? 'เตือนภัย' : 'ปลอดภัย'}
        </Chip>
        
        <View style={styles.textContainer}>
          <Text variant="headlineMedium" style={styles.title}>
            {isFlooding ? 'มีโอกาสเกิดน้ำท่วม' : 'สถานการณ์ปกติ'}
          </Text>
          
          <Text variant="bodyMedium" style={styles.description}>
            {isFlooding 
              ? 'ระดับน้ำเฉลี่ยสูงกว่าระดับตลิ่ง กรุณาเตรียมพร้อมรับมือ' 
              : 'ระดับน้ำอยู่ในเกณฑ์ปกติ ไม่มีความเสี่ยง'}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: '#fff',
    borderLeftWidth: 6,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 8,
    gap: 16,
  },
  emoji: {
    fontSize: 64,
  },
  chip: {
    borderRadius: 20,
  },
  chipText: {
    fontFamily: 'Prompt_700Bold',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  textContainer: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: 'Prompt_700Bold',
    color: '#0F172A',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Prompt_400Regular',
    color: '#475569',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 22,
  },
});
