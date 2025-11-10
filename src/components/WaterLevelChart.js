import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Box, VStack, HStack, Text, Divider } from '@gluestack-ui/themed';
import { LineChart } from 'react-native-chart-kit';

export const WaterLevelChart = ({ waterLevels, riverbankLevel, numSteps }) => {
  const screenWidth = Dimensions.get('window').width;
  
  return (
    <Box 
      bg="$white" 
      mx="$4" 
      mb="$3" 
      p="$5" 
      borderRadius="$xl"
      shadowColor="$black"
      shadowOpacity={0.08}
      shadowRadius={8}
      elevation={4}
    >
      <HStack space="md" alignItems="center" mb="$4" pb="$3">
        <Text fontSize="$3xl">📈</Text>
        <VStack>
          <Text fontSize="$xl" fontWeight="$bold" color="$textDark950">
            กราฟระดับน้ำ
          </Text>
          <Text fontSize="$sm" color="$textDark500">
            แสดงการเปลี่ยนแปลงตามระยะทาง
          </Text>
        </VStack>
      </HStack>
      
      <Divider mb="$4" />
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={true}
      >
        <LineChart
          data={{
            labels: Array.from({ length: numSteps + 1 }, (_, i) => 
              i % 2 === 0 ? i.toString() : ''
            ),
            datasets: [
              {
                data: waterLevels,
                color: (opacity = 1) => `rgba(14, 165, 233, ${opacity})`,
                strokeWidth: 3,
              },
              {
                data: Array(numSteps + 1).fill(riverbankLevel),
                color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
                strokeWidth: 2,
                withDots: false,
              },
            ],
          }}
          width={Math.max(screenWidth + 200, (numSteps + 1) * 50)}
          height={280}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#F8FAFC',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(15, 23, 42, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,
            style: {
              borderRadius: 12,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#ffffff',
            },
            propsForBackgroundLines: {
              strokeDasharray: '',
              stroke: '#F1F5F9',
              strokeWidth: 1,
            },
          }}
          bezier
          style={{ borderRadius: 12, marginVertical: 8 }}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={false}
          withHorizontalLines={true}
        />
      </ScrollView>
      
      <Divider my="$4" />
      
      <HStack space="xl" justifyContent="center">
        <HStack space="sm" alignItems="center">
          <Box w="$6" h="$1" bg="$blue500" borderRadius="$sm" />
          <Text fontSize="$sm" color="$textDark700" fontWeight="$medium">
            ระดับน้ำที่คาดการณ์
          </Text>
        </HStack>
        <HStack space="sm" alignItems="center">
          <Box w="$6" h="$1" bg="$red500" borderRadius="$sm" />
          <Text fontSize="$sm" color="$textDark700" fontWeight="$medium">
            ระดับตลิ่ง
          </Text>
        </HStack>
      </HStack>

      <Box bg="$backgroundLight100" p="$3" borderRadius="$md" mt="$4">
        <HStack space="sm" alignItems="center">
          <Text fontSize="$md">💡</Text>
          <Text fontSize="$xs" color="$textDark600" flex={1}>
            เลื่อนกราฟไปทางขวาเพื่อดูข้อมูลทั้งหมด
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};
