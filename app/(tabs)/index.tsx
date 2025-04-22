import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  FadeIn
} from 'react-native-reanimated';
import { useWeather } from '@/context/WeatherContext';
import { useLocationPermission } from '@/hooks/useLocationPermission';
import BackgroundGradient from '@/components/BackgroundGradient';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast';
import WeatherDetails from '@/components/WeatherDetails';
import { theme } from '@/constants/theme';

export default function HomeScreen() {
  const { 
    currentWeather, 
    hourlyForecast, 
    loading, 
    error, 
    fetchWeatherByCoords 
  } = useWeather();
  const { location, requesting, permissionStatus } = useLocationPermission();

  const contentOpacity = useSharedValue(0);
  
  useEffect(() => {
    if (location && !loading && !requesting) {
      fetchWeatherByCoords(location.coords.latitude, location.coords.longitude);
      contentOpacity.value = withTiming(1, { duration: 800 });
    }
  }, [location, requesting]);

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [
        { translateY: withSpring(contentOpacity.value * 0 + (1 - contentOpacity.value) * 20) }
      ]
    };
  });

  if (loading || requesting) {
    return (
      <View style={styles.loadingContainer}>
        <BackgroundGradient condition="clear" timeOfDay="day" />
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        <Text style={styles.loadingText}>
          {requesting ? 'Requesting location...' : 'Loading weather data...'}
        </Text>
      </View>
    );
  }

  if (error || !currentWeather) {
    return (
      <View style={styles.errorContainer}>
        <BackgroundGradient condition="clear" timeOfDay="day" />
        <Text style={styles.errorText}>
          {error || 'Could not load weather data. Please try again.'}
        </Text>
      </View>
    );
  }

  const { condition, timeOfDay } = currentWeather;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <BackgroundGradient 
        condition={condition} 
        timeOfDay={timeOfDay} 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.contentContainer, animatedContentStyle]}>
          <CurrentWeather 
            currentWeather={currentWeather} 
          />
          
          <Animated.View entering={FadeIn.delay(300).duration(800)}>
            <HourlyForecast data={hourlyForecast} />
          </Animated.View>
          
          <Animated.View entering={FadeIn.delay(500).duration(800)}>
            <WeatherDetails data={currentWeather} />
          </Animated.View>
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
    paddingTop: 60,
    paddingBottom: 120,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
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