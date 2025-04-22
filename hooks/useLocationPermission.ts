import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

export function useLocationPermission() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);
  const [requesting, setRequesting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setRequesting(true);
        
        if (Platform.OS === 'web') {
          // For web, return mock location
          setTimeout(() => {
            setLocation({
              coords: {
                latitude: 40.7128,
                longitude: -74.0060,
                altitude: null,
                accuracy: null,
                altitudeAccuracy: null,
                heading: null,
                speed: null,
              },
              timestamp: Date.now(),
            });
            setPermissionStatus('granted');
            setRequesting(false);
          }, 1000);
          return;
        }
        
        // Check if location services are enabled
        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setError('Location services are disabled. Please enable them in your device settings to use this feature.');
          setPermissionStatus('denied');
          setRequesting(false);
          return;
        }
        
        // For native platforms
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status);
        
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          setRequesting(false);
          return;
        }
        
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (err) {
        console.error('Error getting location:', err);
        setError('Failed to get location. Please try again.');
      } finally {
        setRequesting(false);
      }
    })();
  }, []);

  return { location, permissionStatus, requesting, error };
}