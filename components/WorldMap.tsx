import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn } from 'react-native-reanimated';
import { MapPin } from 'lucide-react-native';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface WorldMapProps {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
}

const WorldMap = ({ location }: WorldMapProps) => {
  // Calculate pin position based on coordinates
  const pinLeft = ((location.lon + 180) / 360) * width;
  const pinTop = ((90 - location.lat) / 180) * 200;

  return (
    <View style={styles.container}>
      <BlurView intensity={30} tint="dark" style={styles.mapContainer}>
        <Animated.Image
          entering={FadeIn.duration(800)}
          source={{ uri: 'https://images.pexels.com/photos/4215102/pexels-photo-4215102.jpeg' }}
          style={styles.mapImage}
          resizeMode="cover"
        />
        
        <Animated.View 
          entering={FadeIn.delay(500).duration(800)}
          style={[styles.pinContainer, { left: pinLeft, top: pinTop }]}
        >
          <MapPin color={theme.colors.primary[400]} size={24} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>{location.name}</Text>
            <Text style={styles.locationCountry}>{location.country}</Text>
          </View>
        </Animated.View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  pinContainer: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -12 }, { translateY: -24 }],
  },
  locationInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  locationName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.neutral[100],
    textAlign: 'center',
  },
  locationCountry: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.neutral[300],
    textAlign: 'center',
  },
});

export default WorldMap;