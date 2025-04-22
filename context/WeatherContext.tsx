import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { weatherApi } from '@/services/weatherApi';
import { mockWeatherData } from '@/utils/mockData';
import { Platform } from 'react-native';

interface WeatherContextType {
  currentWeather: any;
  hourlyForecast: any[];
  dailyForecast: any[];
  loading: boolean;
  error: string | null;
  searchResults: any[];
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  fetchWeatherByCity: (city: string) => Promise<void>;
  searchLocations: (query: string) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);
  const [dailyForecast, setDailyForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Use mock data for web platform
  useEffect(() => {
    if (Platform.OS === 'web') {
      setCurrentWeather(mockWeatherData.current);
      setHourlyForecast(mockWeatherData.hourly);
      setDailyForecast(mockWeatherData.daily);
      setLoading(false);
    }
  }, []);
  
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      
      if (Platform.OS === 'web') {
        // Use mock data for web
        setCurrentWeather(mockWeatherData.current);
        setHourlyForecast(mockWeatherData.hourly);
        setDailyForecast(mockWeatherData.daily);
      } else {
        // Fetch real data for native platforms
        const data = await weatherApi.getWeatherByCoords(lat, lon);
        setCurrentWeather(data.current);
        setHourlyForecast(data.hourly);
        setDailyForecast(data.daily);
      }
    } catch (err) {
      console.error('Error fetching weather by coords:', err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchWeatherByCity = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (Platform.OS === 'web') {
        // Use mock data for web
        setCurrentWeather({
          ...mockWeatherData.current,
          location: city
        });
        setHourlyForecast(mockWeatherData.hourly);
        setDailyForecast(mockWeatherData.daily);
      } else {
        // Fetch real data for native platforms
        const data = await weatherApi.getWeatherByCity(city);
        setCurrentWeather(data.current);
        setHourlyForecast(data.hourly);
        setDailyForecast(data.daily);
      }
    } catch (err) {
      console.error('Error fetching weather by city:', err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const searchLocations = async (query: string) => {
    try {
      setError(null);
      
      if (Platform.OS === 'web') {
        // Use mock search results for web
        setSearchResults([
          { name: 'New York', country: 'US' },
          { name: 'London', country: 'UK' },
          { name: 'Paris', country: 'FR' },
          { name: 'Tokyo', country: 'JP' },
          { name: 'Sydney', country: 'AU' },
        ]);
      } else {
        // Fetch real search results for native platforms
        const results = await weatherApi.searchLocations(query);
        setSearchResults(results);
      }
    } catch (err) {
      console.error('Error searching locations:', err);
      setError('Failed to search locations. Please try again.');
      setSearchResults([]);
    }
  };
  
  return (
    <WeatherContext.Provider value={{
      currentWeather,
      hourlyForecast,
      dailyForecast,
      loading,
      error,
      searchResults,
      fetchWeatherByCoords,
      fetchWeatherByCity,
      searchLocations,
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};