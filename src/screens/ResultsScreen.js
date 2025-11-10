import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Box, VStack, HStack, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { 
  StatusCard, 
  MetricsGrid, 
  WaterLevelChart, 
  InfoSection 
} from '../components';
import { calculateFloodPrediction } from '../utils/calculations';
import { 
  RAW_DATA,
  G_CONSTANT,
  Z_BED,
  DELTA_X,
  NUM_STEPS
} from '../constants/floodData';

export const ResultsScreen = ({ route, navigation }) => {
  const { selectedYear, riverbankLevel } = route.params;
  const [results, setResults] = useState(null);

  useEffect(() => {
    const rawData = RAW_DATA[selectedYear];
    const prediction = calculateFloodPrediction(
      rawData,
      G_CONSTANT,
      Z_BED,
      DELTA_X,
      NUM_STEPS,
      riverbankLevel
    );
    setResults(prediction);
  }, [selectedYear, riverbankLevel]);

  return (
    <Box flex={1} bg="$backgroundLight50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="md">
          {/* Header Section */}
          <Box bg="$blue500" pt="$12" pb="$6" px="$4">
            <VStack space="md" alignItems="center">
              <Text 
                fontSize="$3xl" 
                fontWeight="$bold" 
                color="$white"
                textAlign="center"
                fontFamily="Prompt_700Bold"
              >
                ผลการวิเคราะห์
              </Text>
              <HStack space="sm" alignItems="center">
                <Box bg="rgba(255, 255, 255, 0.2)" px="$3" py="$1" borderRadius="$full">
                  <Text 
                    fontSize="$sm" 
                    color="$white"
                    fontFamily="Prompt_500Medium"
                  >
                    ปี {selectedYear}
                  </Text>
                </Box>
                <Box bg="rgba(255, 255, 255, 0.2)" px="$3" py="$1" borderRadius="$full">
                  <Text 
                    fontSize="$sm" 
                    color="$white"
                    fontFamily="Prompt_500Medium"
                  >
                    ตลิ่ง {riverbankLevel.toFixed(1)} ม.
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </Box>

          {results && (
            <>
              <StatusCard isFlooding={results.isFlooding} />
              
              <MetricsGrid
                averageLevel={results.W_average}
                riverbankLevel={riverbankLevel}
                maxLevel={results.maxLevel}
                numSteps={NUM_STEPS}
              />

              <WaterLevelChart
                waterLevels={results.W_levels}
                riverbankLevel={riverbankLevel}
                numSteps={NUM_STEPS}
              />

              <InfoSection
                selectedYear={selectedYear}
                numSteps={NUM_STEPS}
                deltaX={DELTA_X}
              />

              {/* Action Button */}
              <Box mx="$4" mb="$8">
                <Button
                  size="lg"
                  bg="$blue500"
                  borderRadius="$xl"
                  onPress={() => navigation.goBack()}
                  h="$14"
                  shadowColor="$blue500"
                  shadowOpacity={0.3}
                  shadowRadius={12}
                  elevation={8}
                >
                  <HStack space="sm" alignItems="center">
                    <Text fontSize="$lg">🔄</Text>
                    <ButtonText 
                      fontSize="$lg" 
                      fontWeight="$bold"
                      fontFamily="Prompt_700Bold"
                    >
                      คำนวณใหม่
                    </ButtonText>
                  </HStack>
                </Button>
              </Box>
            </>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};
