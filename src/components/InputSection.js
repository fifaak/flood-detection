import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Box, VStack, HStack, Text, Divider, Input, InputField, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@gluestack-ui/themed';
import RNPickerSelect from 'react-native-picker-select';

export const InputSection = ({ 
  selectedYear, 
  onYearChange, 
  riverbankLevel, 
  onRiverbankChange,
  yearOptions,
  riverbankOptions 
}) => {
  const [inputValue, setInputValue] = useState(riverbankLevel.toString());
  const [sliderValue, setSliderValue] = useState(riverbankLevel);

  const handleInputChange = (text) => {
    setInputValue(text);
    const numValue = parseFloat(text);
    if (!isNaN(numValue) && numValue >= 0.5 && numValue <= 5.0) {
      setSliderValue(numValue);
      onRiverbankChange(numValue);
    }
  };

  const handleSliderChange = (value) => {
    const roundedValue = Math.round(value * 10) / 10;
    setSliderValue(roundedValue);
    setInputValue(roundedValue.toFixed(1));
    onRiverbankChange(roundedValue);
  };

  const handlePresetClick = (value) => {
    setSliderValue(value);
    setInputValue(value.toFixed(1));
    onRiverbankChange(value);
  };

  return (
    <Box bg="$white" mx="$4" mt="$4" p="$5" borderRadius="$xl" shadowColor="$black" shadowOpacity={0.08} shadowRadius={8} elevation={4}>
      <HStack space="sm" alignItems="center" mb="$4" pb="$3">
        <Text fontSize="$2xl">⚙️</Text>
        <Text fontSize="$xl" fontWeight="$bold" color="$textDark950">
          ตั้งค่าการคำนวณ
        </Text>
      </HStack>
      
      <Divider mb="$4" />
      
      <VStack space="lg">
        {/* Year Selection */}
        <VStack space="sm">
          <HStack space="sm" alignItems="center" mb="$2">
            <Text fontSize="$lg">📅</Text>
            <Text fontSize="$md" fontWeight="$medium" color="$textDark700">
              ปีข้อมูลอุทกวิทยา
            </Text>
          </HStack>
          
          <HStack space="sm" flexWrap="wrap">
            {yearOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => onYearChange(option.value)}
                style={styles.yearButton}
              >
                <Box
                  bg={selectedYear === option.value ? "$blue500" : "$white"}
                  px="$5"
                  py="$4"
                  borderRadius="$xl"
                  borderWidth={2}
                  borderColor={selectedYear === option.value ? "$blue500" : "$borderLight200"}
                  shadowColor="$black"
                  shadowOpacity={selectedYear === option.value ? 0.15 : 0.05}
                  shadowRadius={selectedYear === option.value ? 8 : 4}
                  elevation={selectedYear === option.value ? 4 : 2}
                  minWidth="$24"
                  alignItems="center"
                >
                  <Text
                    fontSize="$xs"
                    fontWeight="$medium"
                    color={selectedYear === option.value ? "$white" : "$textDark500"}
                    mb="$1"
                    opacity={0.8}
                  >
                    พ.ศ.
                  </Text>
                  <Text
                    fontSize="$2xl"
                    fontWeight="$bold"
                    color={selectedYear === option.value ? "$white" : "$textDark950"}
                  >
                    {option.value}
                  </Text>
                  {selectedYear === option.value && (
                    <Box
                      position="absolute"
                      top={-8}
                      right={-8}
                      bg="$green500"
                      borderRadius="$full"
                      p="$1"
                      borderWidth={2}
                      borderColor="$white"
                    >
                      <Text fontSize="$xs">✓</Text>
                    </Box>
                  )}
                </Box>
              </TouchableOpacity>
            ))}
          </HStack>
          
          <Box bg="$blue50" p="$3" borderRadius="$lg" mt="$2">
            <HStack space="sm" alignItems="center">
              <Text fontSize="$md">ℹ️</Text>
              <Text fontSize="$xs" color="$blue700" flex={1}>
                เลือกปีข้อมูลที่ต้องการวิเคราะห์
              </Text>
            </HStack>
          </Box>
        </VStack>

        {/* Riverbank Level - Custom Input */}
        <VStack space="sm">
          <HStack space="sm" alignItems="center" justifyContent="space-between" mb="$1">
            <HStack space="sm" alignItems="center">
              <Text fontSize="$lg">📏</Text>
              <Text fontSize="$md" fontWeight="$medium" color="$textDark700">
                ระดับตลิ่งอ้างอิง
              </Text>
            </HStack>
            <Box 
              bg="$blue50" 
              px="$3" 
              py="$1" 
              borderRadius="$full"
            >
              <Text fontSize="$xl" fontWeight="$bold" color="$blue600">
                {sliderValue.toFixed(1)} ม.
              </Text>
            </Box>
          </HStack>

          {/* Slider */}
          <Box px="$2" py="$3">
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              minValue={0.5}
              maxValue={5.0}
              step={0.1}
              size="md"
            >
              <SliderTrack bg="$backgroundLight200">
                <SliderFilledTrack bg="$blue500" />
              </SliderTrack>
              <SliderThumb 
                bg="$blue500" 
                borderWidth={3}
                borderColor="$white"
                shadowColor="$black"
                shadowOpacity={0.2}
                shadowRadius={4}
                elevation={4}
              />
            </Slider>
            <HStack justifyContent="space-between" mt="$2">
              <Text fontSize="$xs" color="$textDark500">0.5 ม.</Text>
              <Text fontSize="$xs" color="$textDark500">5.0 ม.</Text>
            </HStack>
          </Box>

          {/* Quick Presets */}
          <VStack space="xs">
            <Text fontSize="$sm" color="$textDark600" fontWeight="$medium">
              ค่าที่แนะนำ:
            </Text>
            <HStack space="sm" flexWrap="wrap">
              {[1.5, 2.0, 2.5, 3.0, 3.5, 4.0].map((preset) => (
                <TouchableOpacity
                  key={preset}
                  onPress={() => handlePresetClick(preset)}
                  style={styles.presetButton}
                >
                  <Box
                    bg={sliderValue === preset ? "$blue500" : "$backgroundLight100"}
                    px="$4"
                    py="$2"
                    borderRadius="$lg"
                    borderWidth={2}
                    borderColor={sliderValue === preset ? "$blue500" : "$borderLight200"}
                  >
                    <Text
                      fontSize="$sm"
                      fontWeight="$semibold"
                      color={sliderValue === preset ? "$white" : "$textDark700"}
                    >
                      {preset.toFixed(1)} ม.
                    </Text>
                  </Box>
                </TouchableOpacity>
              ))}
            </HStack>
          </VStack>

          {/* Manual Input */}
          <VStack space="xs">
            <Text fontSize="$sm" color="$textDark600" fontWeight="$medium">
              หรือกรอกค่าเอง:
            </Text>
            <HStack space="sm" alignItems="center">
              <Box flex={1}>
                <Input
                  variant="outline"
                  size="lg"
                  borderWidth={2}
                  borderColor="$borderLight200"
                  borderRadius="$lg"
                  bg="$backgroundLight100"
                  focusable={true}
                  $focus={{
                    borderColor: "$blue500",
                    bg: "$white",
                  }}
                >
                  <InputField
                    value={inputValue}
                    onChangeText={handleInputChange}
                    keyboardType="decimal-pad"
                    placeholder="0.5 - 5.0"
                    fontSize="$md"
                    fontWeight="$medium"
                    color="$textDark950"
                  />
                </Input>
              </Box>
              <Box
                bg="$backgroundLight100"
                px="$4"
                py="$3"
                borderRadius="$lg"
                borderWidth={2}
                borderColor="$borderLight200"
              >
                <Text fontSize="$md" fontWeight="$semibold" color="$textDark700">
                  เมตร
                </Text>
              </Box>
            </HStack>
            <Text fontSize="$xs" color="$textDark500" mt="$1">
              💡 ระบุค่าระหว่าง 0.5 - 5.0 เมตร
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  presetButton: {
    marginBottom: 8,
  },
  yearButton: {
    marginBottom: 12,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#0F172A',
    fontWeight: '500',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#0F172A',
    fontWeight: '500',
  },
});
