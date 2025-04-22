import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn } from 'react-native-reanimated';
import { 
  Droplets, 
  Wind, 
  Compass, 
  CloudRain, 
  Eye, 
  Sun 
} from 'lucide-react-native';
import { useSettings } from '@/hooks/useSettings';
import { formatWindSpeed } from '@/utils/formatters';
import { theme } from '@/constants/theme';

interface WeatherDetailsProps {
  data: {
    humidity: number;
    windSpeed: number;
    windDirection: string;
    precipitation: number;
    visibility: number;
    uvIndex: number;
  };
}

const DetailItem = ({ 
  icon, 
  label, 
  value, 
  unit 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number; 
  unit: string;
}) => (
  <View style={styles.detailItem}>
    <View style={styles.detailIconContainer}>
      {icon}
    </View>
    <View>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>
        {value} <Text style={styles.detailUnit}>{unit}</Text>
      </Text>
    </View>
  </View>
);

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { settings } = useSettings();
  
  const { 
    humidity, 
    windSpeed, 
    windDirection, 
    precipitation, 
    visibility, 
    uvIndex 
  } = data;
  
  const formattedWindSpeed = formatWindSpeed(windSpeed, settings.windSpeedUnit);
  const windSpeedUnit = settings.windSpeedUnit === 'kph' ? 'km/h' : 'mph';
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Details</Text>
      
      <BlurView intensity={30} tint="dark" style={styles.contentContainer}>
        <Animated.View entering={FadeIn.duration(800)} style={styles.detailsGrid}>
          <DetailItem 
            icon={<Droplets size={22} color={theme.colors.secondary[400]} />} 
            label="Humidity" 
            value={humidity} 
            unit="%" 
          />
          
          <DetailItem 
            icon={<Wind size={22} color={theme.colors.secondary[400]} />} 
            label="Wind Speed" 
            value={formattedWindSpeed} 
            unit={windSpeedUnit} 
          />
          
          <DetailItem 
            icon={<Compass size={22} color={theme.colors.secondary[400]} />} 
            label="Wind Direction" 
            value={windDirection} 
            unit="" 
          />
          
          <DetailItem 
            icon={<CloudRain size={22} color={theme.colors.secondary[400]} />} 
            label="Precipitation" 
            value={precipitation} 
            unit="mm" 
          />
          
          <DetailItem 
            icon={<Eye size={22} color={theme.colors.secondary[400]} />} 
            label="Visibility" 
            value={visibility} 
            unit="km" 
          />
          
          <DetailItem 
            icon={<Sun size={22} color={theme.colors.secondary[400]} />} 
            label="UV Index" 
            value={uvIndex} 
            unit="" 
          />
        </Animated.View>
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
    padding: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
  },
  detailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.neutral[300],
    marginBottom: 2,
  },
  detailValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.neutral[100],
  },
  detailUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.neutral[300],
  },
});

export default WeatherDetails;