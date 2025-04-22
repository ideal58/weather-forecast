import { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { useWeather } from '@/context/WeatherContext';
import BackgroundGradient from '@/components/BackgroundGradient';
import DailyForecastList from '@/components/DailyForecastList';
import LocationHeader from '@/components/LocationHeader';
import WorldMap from '@/components/WorldMap';
import { theme } from '@/constants/theme';

export default function ForecastScreen() {
  const { 
    currentWeather, 
    dailyForecast, 
    loading, 
    error 
  } = useWeather();
  
  if (loading || !currentWeather) {
    return (
      <View style={styles.loadingContainer}>
        <BackgroundGradient condition="clear" timeOfDay="day" />
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        <Text style={styles.loadingText}>Loading forecast data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <BackgroundGradient condition="clear" timeOfDay="day" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const { condition, timeOfDay, location } = currentWeather;

  // Mock coordinates for demonstration
  const locationData = {
    name: location,
    country: 'US',
    lat: 40.7128,
    lon: -74.0060,
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <BackgroundGradient 
        condition={condition} 
        timeOfDay={timeOfDay} 
        opacity={0.7}
      />
      
      <LocationHeader location={location} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(800)} style={styles.contentContainer}>
          <WorldMap location={locationData} />
          
          <Text style={styles.title}>7-Day Forecast</Text>
          <DailyForecastList data={dailyForecast} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 100,
    paddingBottom: 120,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: theme.colors.neutral[100],
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    color: theme.colors.neutral[100],
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: theme.colors.neutral[100],
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    textAlign: 'center',
  }
});