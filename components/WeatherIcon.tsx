import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  CloudSun,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface WeatherIconProps {
  condition: string;
  size?: number;
  color?: string;
  animated?: boolean;
}

const WeatherIcon = ({
  condition,
  size = 60,
  color = theme.colors.neutral[100],
  animated = false,
}: WeatherIconProps) => {
  // Animation values
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  
  // Start animations if animated prop is true
  if (animated) {
    // Different animations based on weather type
    switch (condition) {
      case 'clear':
        // Sun rotation and pulse
        rotation.value = withRepeat(
          withTiming(360, { duration: 20000, easing: Easing.linear }),
          -1, // infinite
          false
        );
        scale.value = withRepeat(
          withSequence(
            withTiming(1.05, { duration: 2000, easing: Easing.sin }),
            withTiming(1, { duration: 2000, easing: Easing.sin })
          ),
          -1,
          true
        );
        break;
        
      case 'partlyCloudy':
        // Cloud float and sun peek
        rotation.value = withRepeat(
          withTiming(10, { duration: 10000, easing: Easing.linear }),
          -1,
          true
        );
        translateY.value = withRepeat(
          withSequence(
            withTiming(-3, { duration: 2500, easing: Easing.sin }),
            withTiming(0, { duration: 2500, easing: Easing.sin })
          ),
          -1,
          true
        );
        break;
        
      case 'rain':
      case 'drizzle':
        // Rain cloud bounce
        translateY.value = withRepeat(
          withSequence(
            withTiming(-2, { duration: 1000, easing: Easing.sin }),
            withTiming(0, { duration: 1000, easing: Easing.sin })
          ),
          -1,
          true
        );
        break;
        
      case 'thunderstorm':
        // Lightning flash
        scale.value = withRepeat(
          withDelay(
            2000,
            withSequence(
              withTiming(1.1, { duration: 200, easing: Easing.sin }),
              withTiming(1, { duration: 200, easing: Easing.sin })
            )
          ),
          -1,
          true
        );
        break;
        
      default:
        // Gentle float for other conditions
        translateY.value = withRepeat(
          withSequence(
            withTiming(-2, { duration: 2000, easing: Easing.sin }),
            withTiming(0, { duration: 2000, easing: Easing.sin })
          ),
          -1,
          true
        );
    }
  }
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });
  
  // Render appropriate icon based on condition
  const renderIcon = () => {
    switch (condition) {
      case 'clear':
        return <Sun size={size} color={color} />;
      case 'partlyCloudy':
        return <CloudSun size={size} color={color} />;
      case 'cloudy':
        return <Cloud size={size} color={color} />;
      case 'rain':
        return <CloudRain size={size} color={color} />;
      case 'drizzle':
        return <CloudDrizzle size={size} color={color} />;
      case 'thunderstorm':
        return <CloudLightning size={size} color={color} />;
      case 'snow':
        return <CloudSnow size={size} color={color} />;
      case 'mist':
      case 'fog':
        return <CloudFog size={size} color={color} />;
      default:
        return <Cloud size={size} color={color} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle]}>
        {renderIcon()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WeatherIcon;