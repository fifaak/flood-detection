import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, VStack, HStack, Text, Button, ButtonText } from '@gluestack-ui/themed';
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
    <Box flex={1} bg="$backgroundLight50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="md">
          <Header />
          
          <Box px="$4" py="$2">
            <VStack space="xs">
              <Text 
                fontSize="$2xl" 
                fontWeight="$bold" 
                color="$textDark950"
                fontFamily="Prompt_700Bold"
              >
                ตั้งค่าการคำนวณ
              </Text>
              <Text 
                fontSize="$md" 
                color="$textDark600"
                fontFamily="Prompt_400Regular"
              >
                กรุณาเลือกข้อมูลที่ต้องการวิเคราะห์
              </Text>
            </VStack>
          </Box>
          
          <InputSection
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            riverbankLevel={riverbankLevel}
            onRiverbankChange={setRiverbankLevel}
            yearOptions={YEAR_OPTIONS}
            riverbankOptions={RIVERBANK_OPTIONS}
          />

          {/* Info Cards */}
          <VStack space="sm" mx="$4">
            <Box 
              bg="$blue50" 
              p="$4" 
              borderRadius="$lg"
              borderLeftWidth={4}
              borderLeftColor="$blue500"
            >
              <HStack space="sm" alignItems="center">
                <Text fontSize="$xl">📊</Text>
                <VStack flex={1}>
                  <Text 
                    fontSize="$sm" 
                    fontWeight="$semibold" 
                    color="$blue700"
                    fontFamily="Prompt_600SemiBold"
                  >
                    ข้อมูลที่เลือก
                  </Text>
                  <Text 
                    fontSize="$xs" 
                    color="$blue600"
                    fontFamily="Prompt_400Regular"
                  >
                    ปี {selectedYear} • ระดับตลิ่ง {riverbankLevel.toFixed(1)} เมตร
                  </Text>
                </VStack>
              </HStack>
            </Box>

            <Box 
              bg="$purple50" 
              p="$4" 
              borderRadius="$lg"
              borderLeftWidth={4}
              borderLeftColor="$purple500"
            >
              <HStack space="sm" alignItems="center">
                <Text fontSize="$xl">🔬</Text>
                <VStack flex={1}>
                  <Text 
                    fontSize="$sm" 
                    fontWeight="$semibold" 
                    color="$purple700"
                    fontFamily="Prompt_600SemiBold"
                  >
                    วิธีการคำนวณ
                  </Text>
                  <Text 
                    fontSize="$xs" 
                    color="$purple600"
                    fontFamily="Prompt_400Regular"
                  >
                    Saint-Venant Equation • Euler's Method
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </VStack>

          {/* Calculate Button */}
          <Box px="$4" py="$6">
            <Button
              size="xl"
              bg="$blue500"
              borderRadius="$xl"
              onPress={handleCalculate}
              shadowColor="$blue500"
              shadowOpacity={0.3}
              shadowRadius={12}
              elevation={8}
              $active-bg="$blue600"
              h="$16"
            >
              <HStack space="md" alignItems="center">
                <Text fontSize="$2xl">🧮</Text>
                <ButtonText 
                  fontSize="$xl" 
                  fontWeight="$bold"
                  fontFamily="Prompt_700Bold"
                >
                  คำนวณและวิเคราะห์
                </ButtonText>
              </HStack>
            </Button>
          </Box>

          {/* Additional Info */}
          <Box 
            bg="$white" 
            mx="$4" 
            mb="$8" 
            p="$5" 
            borderRadius="$xl"
            shadowColor="$black"
            shadowOpacity={0.05}
            shadowRadius={8}
            elevation={2}
          >
            <VStack space="md">
              <HStack space="sm" alignItems="center">
                <Text fontSize="$xl">💡</Text>
                <Text 
                  fontSize="$lg" 
                  fontWeight="$bold" 
                  color="$textDark950"
                  fontFamily="Prompt_700Bold"
                >
                  เกี่ยวกับการคำนวณ
                </Text>
              </HStack>
              
              <VStack space="sm">
                <Text 
                  fontSize="$sm" 
                  color="$textDark700"
                  lineHeight="$md"
                  fontFamily="Prompt_400Regular"
                >
                  • ระบบจะคำนวณระดับน้ำในระยะทาง 7,000 เมตร
                </Text>
                <Text 
                  fontSize="$sm" 
                  color="$textDark700"
                  lineHeight="$md"
                  fontFamily="Prompt_400Regular"
                >
                  • แบ่งเป็น 14 ช่วง ช่วงละ 500 เมตร
                </Text>
                <Text 
                  fontSize="$sm" 
                  color="$textDark700"
                  lineHeight="$md"
                  fontFamily="Prompt_400Regular"
                >
                  • ใช้ข้อมูลอุทกวิทยาจริงจากแม่น้ำในจังหวัดสระบุรี
                </Text>
                <Text 
                  fontSize="$sm" 
                  color="$textDark700"
                  lineHeight="$md"
                  fontFamily="Prompt_400Regular"
                >
                  • ผลลัพธ์จะแสดงโอกาสการเกิดน้ำท่วมและกราฟวิเคราะห์
                </Text>
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};
