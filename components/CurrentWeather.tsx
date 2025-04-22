import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import WeatherIcon from './WeatherIcon';
import { useSettings } from '@/hooks/useSettings';
import { formatTemperature } from '@/utils/formatters';
import { theme } from '@/constants/theme';

interface CurrentWeatherProps {
  currentWeather: {
    location: string;
    temperature: number;
    condition: string;
    description: string;
    feelsLike: number;
    high: number;
    low: number;
  };
}

const CurrentWeather = ({ currentWeather }: CurrentWeatherProps) => {
  const { settings } = useSettings();
  
  const {
    location,
    temperature,
    condition,
    description,
    feelsLike,
    high,
    low
  } = currentWeather;
  
  const formattedTemp = formatTemperature(temperature, settings.temperatureUnit);
  const formattedFeelsLike = formatTemperature(feelsLike, settings.temperatureUnit);
  const formattedHigh = formatTemperature(high, settings.temperatureUnit);
  const formattedLow = formatTemperature(low, settings.temperatureUnit);
  
  return (
    <Animated.View entering={FadeIn.duration(800)}>
      <View style={styles.locationContainer}>
        <Text style={styles.location}>{location}</Text>
      </View>
      
      <View style={styles.mainContainer}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{formattedTemp}</Text>
          <Text style={styles.feelsLike}>Feels like {formattedFeelsLike}</Text>
        </View>
        
        <View style={styles.iconContainer}>
          <WeatherIcon condition={condition} size={120} animated />
        </View>
      </View>
      
      <BlurView intensity={30} tint="dark" style={styles.detailsContainer}>
        <Text style={styles.description}>{description}</Text>
        
        <View style={styles.highLowContainer}>
          <View style={styles.highLowItem}>
            <Text style={styles.highLowLabel}>High</Text>
            <Text style={styles.highLowValue}>{formattedHigh}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.highLowItem}>
            <Text style={styles.highLowLabel}>Low</Text>
            <Text style={styles.highLowValue}>{formattedLow}</Text>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontFamily: 'Poppins-Medium',
    fontSize: 28,
    color: theme.colors.neutral[100],
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatureContainer: {
    flex: 1,
  },
  temperature: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 64,
    color: theme.colors.neutral[100],
  },
  feelsLike: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.neutral[200],
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
    marginBottom: 24,
  },
  description: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: theme.colors.neutral[100],
    marginBottom: 12,
    textAlign: 'center',
  },
  highLowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  highLowItem: {
    alignItems: 'center',
  },
  highLowLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.neutral[300],
    marginBottom: 4,
  },
  highLowValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: theme.colors.neutral[100],
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default CurrentWeather;