import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  SharedValue,
  useSharedValue,
  useDerivedValue,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';

type WeatherCondition = 'clear' | 'partlyCloudy' | 'cloudy' | 'rain' | 'thunderstorm' | 'snow' | 'mist';
type TimeOfDay = 'day' | 'night';

interface BackgroundGradientProps {
  condition: WeatherCondition;
  timeOfDay: TimeOfDay;
  opacity?: number;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const BackgroundGradient = ({ condition, timeOfDay, opacity = 1 }: BackgroundGradientProps) => {
  const backgroundOpacity = useSharedValue(opacity);
  
  const gradientColors = useDerivedValue(() => {
    const colors = theme.gradients[condition][timeOfDay];
    return colors;
  }, [condition, timeOfDay]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(backgroundOpacity.value, { duration: 800 }),
    };
  });
  
  return (
    <View style={styles.container}>
      <AnimatedLinearGradient
        colors={gradientColors.value}
        style={[styles.gradient, animatedStyle]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  gradient: {
    flex: 1,
  },
});

export default memo(BackgroundGradient);