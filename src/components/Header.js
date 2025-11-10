import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Box, VStack, HStack, Text, Center } from '@gluestack-ui/themed';

export const Header = () => {
  return (
    <Box overflow="hidden" position="relative">
      <ImageBackground
        source={require('../assets/backdrop.jpg')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <Box 
          bg="rgba(14, 165, 233, 0.85)" 
          pt="$8" 
          pb="$6"
        >
          <VStack space="md" alignItems="center" px="$4">
            <Center
              w="$20"
              h="$20"
              borderRadius="$full"
              bg="rgba(255, 255, 255, 0.25)"
              borderWidth={3}
              borderColor="rgba(255, 255, 255, 0.3)"
              shadowColor="$black"
              shadowOpacity={0.3}
              shadowRadius={10}
              elevation={5}
            >
              <Text fontSize="$4xl">🌊</Text>
            </Center>
            
            <VStack space="xs" alignItems="center">
              <Text 
                fontSize="$3xl" 
                fontWeight="$bold" 
                color="$white"
                textAlign="center"
                fontFamily="Prompt_700Bold"
                style={styles.textShadow}
              >
                คาดการณ์ระดับน้ำ
              </Text>
              <Text 
                fontSize="$md" 
                color="$white"
                opacity={0.95}
                textAlign="center"
                px="$4"
                fontFamily="Prompt_400Regular"
                style={styles.textShadow}
              >
                ระบบวิเคราะห์และพยากรณ์น้ำท่วมอัจฉริยะ
              </Text>
            </VStack>
            
            <Text fontSize="$2xl" color="$white" opacity={0.4}>
              〰️〰️〰️
            </Text>
          </VStack>
        </Box>
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
