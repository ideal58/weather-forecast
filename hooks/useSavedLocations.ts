import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useSavedLocations() {
  const [savedLocations, setSavedLocations] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  
  // Load saved locations from storage
  useEffect(() => {
    const loadSavedLocations = async () => {
      try {
        const storedLocations = await AsyncStorage.getItem('savedLocations');
        if (storedLocations) {
          setSavedLocations(JSON.parse(storedLocations));
        }
      } catch (error) {
        console.error('Error loading saved locations:', error);
      } finally {
        setLoaded(true);
      }
    };
    
    loadSavedLocations();
  }, []);
  
  // Save locations to storage
  useEffect(() => {
    if (loaded) {
      const saveLocations = async () => {
        try {
          await AsyncStorage.setItem('savedLocations', JSON.stringify(savedLocations));
        } catch (error) {
          console.error('Error saving locations:', error);
        }
      };
      
      saveLocations();
    }
  }, [savedLocations, loaded]);
  
  const addSavedLocation = (location: any) => {
    if (!isLocationSaved(location.name)) {
      setSavedLocations(prev => [...prev, location]);
    }
  };
  
  const removeSavedLocation = (locationName: string) => {
    setSavedLocations(prev => 
      prev.filter(location => location.name !== locationName)
    );
  };
  
  const isLocationSaved = (locationName: string) => {
    return savedLocations.some(location => location.name === locationName);
  };
  
  return {
    savedLocations,
    addSavedLocation,
    removeSavedLocation,
    isLocationSaved,
  };
}