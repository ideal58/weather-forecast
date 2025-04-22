import axios from 'axios';
import { Platform } from 'react-native';
import { mockWeatherData } from '@/utils/mockData';

// Mock API for web
const mockApi = {
  getWeatherByCoords: async (lat: number, lon: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockWeatherData;
  },
  
  getWeatherByCity: async (city: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      ...mockWeatherData,
      current: {
        ...mockWeatherData.current,
        location: city
      }
    };
  },
  
  searchLocations: async (query: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Basic filter mock data
    const mockCities = [
      { name: 'New York', country: 'US' },
      { name: 'London', country: 'UK' },
      { name: 'Paris', country: 'FR' },
      { name: 'Tokyo', country: 'JP' },
      { name: 'Sydney', country: 'AU' },
      { name: 'Berlin', country: 'DE' },
      { name: 'Los Angeles', country: 'US' },
      { name: 'Chicago', country: 'US' },
      { name: 'Toronto', country: 'CA' },
      { name: 'Rome', country: 'IT' },
    ];
    
    return mockCities.filter(city => 
      city.name.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Real API for native platforms
const api = {
  // For demonstration only - in a real app you would use actual API keys
  apiKey: 'YOUR_WEATHER_API_KEY',
  baseUrl: 'https://api.example.com',
  
  getWeatherByCoords: async (lat: number, lon: number) => {
    try {
      // In a real app, you would use:
      // const response = await axios.get(`${api.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${api.apiKey}`);
      // return response.data;
      
      // For demo, return mock data
      return mockWeatherData;
    } catch (error) {
      console.error('Error fetching weather by coords:', error);
      throw error;
    }
  },
  
  getWeatherByCity: async (city: string) => {
    try {
      // In a real app, you would use:
      // const response = await axios.get(`${api.baseUrl}/weather?q=${city}&appid=${api.apiKey}`);
      // return response.data;
      
      // For demo, return mock data
      return {
        ...mockWeatherData,
        current: {
          ...mockWeatherData.current,
          location: city
        }
      };
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw error;
    }
  },
  
  searchLocations: async (query: string) => {
    try {
      // In a real app, you would use:
      // const response = await axios.get(`${api.baseUrl}/geo/1.0/direct?q=${query}&limit=5&appid=${api.apiKey}`);
      // return response.data;
      
      // For demo, return mock data
      const mockCities = [
        { name: 'New York', country: 'US' },
        { name: 'London', country: 'UK' },
        { name: 'Paris', country: 'FR' },
        { name: 'Tokyo', country: 'JP' },
        { name: 'Sydney', country: 'AU' },
        { name: 'Berlin', country: 'DE' },
        { name: 'Los Angeles', country: 'US' },
        { name: 'Chicago', country: 'US' },
        { name: 'Toronto', country: 'CA' },
        { name: 'Rome', country: 'IT' },
      ];
      
      return mockCities.filter(city => 
        city.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching locations:', error);
      throw error;
    }
  }
};

// Use mock API for web and real API for native platforms
export const weatherApi = Platform.OS === 'web' ? mockApi : api;