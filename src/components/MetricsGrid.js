import React from 'react';
import { Box, VStack, HStack, Text, Grid, GridItem } from '@gluestack-ui/themed';

const MetricCard = ({ label, value, icon, color }) => (
  <Box 
    bg="$white" 
    p="$5" 
    borderRadius="$lg"
    borderTopWidth={4}
    borderTopColor={color}
    shadowColor="$black"
    shadowOpacity={0.08}
    shadowRadius={8}
    elevation={4}
    alignItems="center"
  >
    <Text fontSize="$3xl" mb="$2">{icon}</Text>
    <Text fontSize="$sm" color="$textDark600" mb="$2" textAlign="center">
      {label}
    </Text>
    <Text fontSize="$2xl" fontWeight="$bold" color={color}>
      {value}
    </Text>
  </Box>
);

export const MetricsGrid = ({ 
  averageLevel, 
  riverbankLevel, 
  maxLevel, 
  numSteps 
}) => {
  return (
    <Box mx="$4" mb="$3">
      <Text 
        fontSize="$lg" 
        fontWeight="$bold" 
        color="$textDark950"
        mb="$3"
        px="$1"
      >
        สรุปผลการวิเคราะห์
      </Text>
      
      <VStack space="md">
        <HStack space="md">
          <Box flex={1}>
            <MetricCard 
              icon="📊"
              label="ระดับน้ำเฉลี่ย" 
              value={`${averageLevel.toFixed(2)} ม.`}
              color="$blue500"
            />
          </Box>
          <Box flex={1}>
            <MetricCard 
              icon="🏔️"
              label="ระดับตลิ่ง" 
              value={`${riverbankLevel.toFixed(2)} ม.`}
              color="$purple500"
            />
          </Box>
        </HStack>
        
        <HStack space="md">
          <Box flex={1}>
            <MetricCard 
              icon="⬆️"
              label="ระดับสูงสุด" 
              value={`${maxLevel.toFixed(2)} ม.`}
              color="$red500"
            />
          </Box>
          <Box flex={1}>
            <MetricCard 
              icon="📍"
              label="จุดวัด" 
              value={`${numSteps} จุด`}
              color="$green500"
            />
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};
