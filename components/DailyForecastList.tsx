import { StyleSheet, Text, View, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { 
  FadeInDown, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';
import WeatherIcon from './WeatherIcon';
import { useSettings } from '@/hooks/useSettings';
import { formatTemperature } from '@/utils/formatters';
import { format } from 'date-fns';
import { theme } from '@/constants/theme';

interface DailyForecastItemProps {
  date: Date;
  condition: string;
  high: number;
  low: number;
  precipitation: number;
  index: number;
  onPress: () => void;
}

interface DailyForecastListProps {
  data: Array<{
    date: Date;
    condition: string;
    high: number;
    low: number;
    precipitation: number;
  }>;
}

const DailyForecastItem = ({ 
  date, 
  condition, 
  high, 
  low, 
  precipitation, 
  index, 
  onPress 
}: DailyForecastItemProps) => {
  const { settings } = useSettings();
  const scale = useSharedValue(1);
  
  const formattedDay = format(date, 'EEE');
  const formattedDate = format(date, 'MMM d');
  const formattedHigh = formatTemperature(high, settings.temperatureUnit, false);
  const formattedLow = formatTemperature(low, settings.temperatureUnit, false);
  
  const isToday = new Date().toDateString() === date.toDateString();
  
  // Animation for press feedback
  const onPressIn = () => {
    scale.value = withSpring(0.97);
  };
  
  const onPressOut = () => {
    scale.value = withSpring(1);
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(400)}
    >
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.View style={[styles.dailyItem, animatedStyle]}>
          <View style={styles.dateContainer}>
            <Text style={[
              styles.dayText, 
              isToday && styles.activeText
            ]}>
              {isToday ? 'Today' : formattedDay}
            </Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          
          <View style={styles.conditionContainer}>
            <WeatherIcon condition={condition} size={32} animated />
            {precipitation > 0 && (
              <View style={styles.precipContainer}>
                <Text style={styles.precipText}>{precipitation}%</Text>
              </View>
            )}
          </View>
          
          <View style={styles.tempContainer}>
            <Text style={styles.highText}>{formattedHigh}</Text>
            <Text style={styles.lowText}>{formattedLow}</Text>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const DailyForecastList = ({ data }: DailyForecastListProps) => {
  if (!data || data.length === 0) {
    return null;
  }
  
  const handleItemPress = () => {
    // Handle item press (could show detailed day forecast)
  };
  
  return (
    <BlurView intensity={30} tint="dark" style={styles.container}>
      {data.map((item, index) => (
        <DailyForecastItem
          key={index}
          date={item.date}
          condition={item.condition}
          high={item.high}
          low={item.low}
          precipitation={item.precipitation}
          index={index}
          onPress={handleItemPress}
        />
      ))}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  dailyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dateContainer: {
    flex: 1,
  },
  dayText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.neutral[100],
    marginBottom: 2,
  },
  activeText: {
    color: theme.colors.primary[400],
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.neutral[300],
  },
  conditionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  precipContainer: {
    backgroundColor: 'rgba(87, 160, 255, 0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  precipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.secondary[300],
  },
  tempContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  highText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.neutral[100],
    marginRight: 12,
  },
  lowText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.neutral[400],
  },
});

export default DailyForecastList;