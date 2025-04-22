import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { MapPin } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface LocationHeaderProps {
  location: string;
}

const LocationHeader = ({ location }: LocationHeaderProps) => {
  const insets = useSafeAreaInsets();
  
  const headerHeight = Platform.OS === 'ios' 
    ? 44 + insets.top 
    : 56 + StatusBar.currentHeight;
  
  return (
    <View style={[
      styles.container, 
      { height: headerHeight, paddingTop: insets.top }
    ]}>
      <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
        <View style={styles.content}>
          <MapPin color={theme.colors.neutral[100]} size={18} />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  blurContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  locationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: theme.colors.neutral[100],
    marginLeft: 8,
  },
});

export default LocationHeader;