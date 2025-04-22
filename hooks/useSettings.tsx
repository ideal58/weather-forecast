import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Settings {
  temperatureUnit: 'celsius' | 'fahrenheit';
  windSpeedUnit: 'kph' | 'mph';
  notifications: boolean;
  weatherAlerts: boolean;
}

interface SettingsContextType {
  settings: Settings;
  toggleTemperatureUnit: () => void;
  toggleWindSpeedUnit: () => void;
  toggleNotifications: () => void;
  toggleWeatherAlerts: () => void;
}

const defaultSettings: Settings = {
  temperatureUnit: 'celsius',
  windSpeedUnit: 'kph',
  notifications: true,
  weatherAlerts: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loaded, setLoaded] = useState(false);
  
  // Load settings from storage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem('weatherAppSettings');
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoaded(true);
      }
    };
    
    loadSettings();
  }, []);
  
  // Save settings to storage
  useEffect(() => {
    if (loaded) {
      const saveSettings = async () => {
        try {
          await AsyncStorage.setItem('weatherAppSettings', JSON.stringify(settings));
        } catch (error) {
          console.error('Error saving settings:', error);
        }
      };
      
      saveSettings();
    }
  }, [settings, loaded]);
  
  const toggleTemperatureUnit = () => {
    setSettings(prev => ({
      ...prev,
      temperatureUnit: prev.temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius',
    }));
  };
  
  const toggleWindSpeedUnit = () => {
    setSettings(prev => ({
      ...prev,
      windSpeedUnit: prev.windSpeedUnit === 'kph' ? 'mph' : 'kph',
    }));
  };
  
  const toggleNotifications = () => {
    setSettings(prev => ({
      ...prev,
      notifications: !prev.notifications,
    }));
  };
  
  const toggleWeatherAlerts = () => {
    setSettings(prev => ({
      ...prev,
      weatherAlerts: !prev.weatherAlerts,
    }));
  };
  
  return (
    <SettingsContext.Provider value={{
      settings,
      toggleTemperatureUnit,
      toggleWindSpeedUnit,
      toggleNotifications,
      toggleWeatherAlerts,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    // For mock usage
    return {
      settings: defaultSettings,
      toggleTemperatureUnit: () => {},
      toggleWindSpeedUnit: () => {},
      toggleNotifications: () => {},
      toggleWeatherAlerts: () => {},
    };
  }
  return context;
};