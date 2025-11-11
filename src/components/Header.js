import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export const Header = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/backdrop.jpg')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Text variant="displayLarge" style={styles.icon}>🌊</Text>
            </View>
            
            <View style={styles.textContainer}>
              <Text variant="headlineLarge" style={styles.title}>
                คาดการณ์ระดับน้ำ
              </Text>
              <Text variant="bodyLarge" style={styles.subtitle}>
                ระบบวิเคราะห์และพยากรณ์น้ำท่วมอัจฉริยะ
              </Text>
            </View>
            
            <Text variant="headlineMedium" style={styles.wave}>
              〰️〰️〰️
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(14, 165, 233, 0.85)',
    paddingTop: 32,
    paddingBottom: 24,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  icon: {
    fontSize: 48,
  },
  textContainer: {
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontFamily: 'Prompt_700Bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: 'Prompt_400Regular',
    color: '#fff',
    opacity: 0.95,
    textAlign: 'center',
    paddingHorizontal: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  wave: {
    color: '#fff',
    opacity: 0.4,
  },
});
