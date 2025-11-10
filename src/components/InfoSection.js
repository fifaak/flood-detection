import React from 'react';
import { Box, VStack, HStack, Text, Divider, Center } from '@gluestack-ui/themed';

const InfoItem = ({ icon, text }) => (
  <HStack space="md" alignItems="center" py="$2">
    <Center
      w="$10"
      h="$10"
      borderRadius="$full"
      bg="$backgroundLight100"
    >
      <Text fontSize="$xl">{icon}</Text>
    </Center>
    <Text fontSize="$md" color="$textDark700" flex={1} lineHeight="$md">
      {text}
    </Text>
  </HStack>
);

export const InfoSection = ({ selectedYear, numSteps, deltaX }) => {
  return (
    <Box 
      bg="$white" 
      mx="$4" 
      mb="$8" 
      p="$5" 
      borderRadius="$xl"
      shadowColor="$black"
      shadowOpacity={0.08}
      shadowRadius={8}
      elevation={4}
    >
      <HStack space="sm" alignItems="center" mb="$4" pb="$3">
        <Text fontSize="$2xl">ℹ️</Text>
        <Text fontSize="$xl" fontWeight="$bold" color="$textDark950">
          รายละเอียดการคำนวณ
        </Text>
      </HStack>
      
      <Divider mb="$4" />
      
      <VStack space="md">
        <InfoItem 
          icon="📅"
          text={`ใช้ข้อมูลอุทกวิทยาจากปี ${selectedYear}`}
        />
        <InfoItem 
          icon="📏"
          text={`คำนวณระยะทางรวม ${(numSteps * deltaX).toLocaleString()} เมตร`}
        />
        <InfoItem 
          icon="📍"
          text={`แบ่งเป็น ${numSteps} ช่วง ช่วงละ ${deltaX.toLocaleString()} เมตร`}
        />
        <InfoItem 
          icon="🔬"
          text="ใช้วิธี Euler's Method ในการคำนวณ"
        />
      </VStack>

      <Divider my="$4" />

      <Box alignItems="center">
        <Text 
          fontSize="$xs" 
          color="$textDark500"
          textAlign="center"
          fontStyle="italic"
        >
          ข้อมูลจากแบบจำลองทางคณิตศาสตร์ Saint-Venant
        </Text>
      </Box>
    </Box>
  );
};
