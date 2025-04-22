import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { FadeInRight } from 'react-native-reanimated';
import WeatherIcon from './WeatherIcon';
import { useSettings } from '@/hooks/useSettings';
import { formatTemperature } from '@/utils/formatters';
import { format } from 'date-fns';
import { theme } from '@/constants/theme';

interface HourlyForecastItemProps {
  time: Date;
  temperature: number;
  condition: string;
  index: number;
}

interface HourlyForecastProps {
  data: Array<{
    time: Date;
    temperature: number;
    condition: string;
  }>;
}

const HourlyForecastItem = ({ time, temperature, condition, index }: HourlyForecastItemProps) => {
  const { settings } = useSettings();
  const formattedTime = format(time, 'ha');
  const formattedTemp = formatTemperature(temperature, settings.temperatureUnit, false);
  
  return (
    <Animated.View 
      entering={FadeInRight.delay(index * 100).duration(400)}
      style={styles.hourlyItem}
    >
      <Text style={styles.hourlyTime}>{formattedTime}</Text>
      <View style={styles.hourlyIconContainer}>
        <WeatherIcon condition={condition} size={28} animated />
      </View>
      <Text style={styles.hourlyTemp}>{formattedTemp}</Text>
    </Animated.View>
  );
};

const HourlyForecast = ({ data }: HourlyForecastProps) => {
  if (!data || data.length === 0) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hourly Forecast</Text>
      
      <BlurView intensity={30} tint="dark" style={styles.contentContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {data.map((item, index) => (
            <HourlyForecastItem
              key={index}
              time={item.time}
              temperature={item.temperature}
              condition={item.condition}
              index={index}
            />
          ))}
        </ScrollView>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: theme.colors.neutral[100],
    marginBottom: 12,
  },
  contentContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  hourlyItem: {
    alignItems: 'center',
    marginHorizontal: 12,
    width: 60,
  },
  hourlyTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.neutral[200],
    marginBottom: 8,
  },
  hourlyIconContainer: {
    marginBottom: 8,
  },
  hourlyTemp: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.neutral[100],
  },
});

export default HourlyForecast;