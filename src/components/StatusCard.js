import React from 'react';
import { Animated } from 'react-native';
import { Box, VStack, HStack, Text, Badge, BadgeText } from '@gluestack-ui/themed';

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
    <Box 
      bg="$white" 
      mx="$4" 
      my="$3" 
      p="$6" 
      borderRadius="$xl"
      borderLeftWidth={6}
      borderLeftColor={isFlooding ? "$red500" : "$green500"}
      shadowColor="$black"
      shadowOpacity={0.12}
      shadowRadius={16}
      elevation={8}
    >
      <VStack space="md" alignItems="center">
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Text fontSize={64}>
            {isFlooding ? '🚨' : '✅'}
          </Text>
        </Animated.View>
        
        <Badge 
          size="md" 
          variant="solid" 
          action={isFlooding ? "error" : "success"}
          borderRadius="$full"
        >
          <BadgeText textTransform="uppercase" fontWeight="$bold" letterSpacing={1}>
            {isFlooding ? 'เตือนภัย' : 'ปลอดภัย'}
          </BadgeText>
        </Badge>
        
        <VStack space="xs" alignItems="center">
          <Text 
            fontSize="$2xl" 
            fontWeight="$bold" 
            color="$textDark950"
            textAlign="center"
          >
            {isFlooding ? 'มีโอกาสเกิดน้ำท่วม' : 'สถานการณ์ปกติ'}
          </Text>
          
          <Text 
            fontSize="$md" 
            color="$textDark600"
            textAlign="center"
            px="$4"
            lineHeight="$md"
          >
            {isFlooding 
              ? 'ระดับน้ำเฉลี่ยสูงกว่าระดับตลิ่ง กรุณาเตรียมพร้อมรับมือ' 
              : 'ระดับน้ำอยู่ในเกณฑ์ปกติ ไม่มีความเสี่ยง'}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};
