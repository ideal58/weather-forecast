import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Search, X, Star, MapPin } from 'lucide-react-native';
import { useWeather } from '@/context/WeatherContext';
import BackgroundGradient from '@/components/BackgroundGradient';
import { useSavedLocations } from '@/hooks/useSavedLocations';
import { theme } from '@/constants/theme';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const { 
    currentWeather,
    searchLocations, 
    searchResults, 
    fetchWeatherByCity,
  } = useWeather();
  
  const { 
    savedLocations,
    addSavedLocation,
    removeSavedLocation,
    isLocationSaved
  } = useSavedLocations();
  
  const handleSearch = async () => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      await searchLocations(searchQuery);
      setIsSearching(false);
    }
  };
  
  const handleSelectLocation = (location: any) => {
    fetchWeatherByCity(location.name);
    // Clear search
    setSearchQuery('');
  };
  
  const renderLocationItem = ({ item }: { item: any }) => {
    const isSaved = isLocationSaved(item.name);
    
    return (
      <Animated.View entering={FadeInDown.duration(400)} style={styles.locationItem}>
        <TouchableOpacity 
          style={styles.locationContent}
          onPress={() => handleSelectLocation(item)}
        >
          <MapPin color={theme.colors.neutral[200]} size={18} />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text style={styles.locationDetail}>{item.country}</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => isSaved 
            ? removeSavedLocation(item.name) 
            : addSavedLocation(item)
          }
          style={styles.starButton}
        >
          <Star 
            color={isSaved ? theme.colors.accent[300] : theme.colors.neutral[400]} 
            fill={isSaved ? theme.colors.accent[300] : 'transparent'}
            size={20} 
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  const renderSavedLocationItem = ({ item }: { item: any }) => {
    return (
      <Animated.View entering={FadeInDown.duration(400)} style={styles.locationItem}>
        <TouchableOpacity 
          style={styles.locationContent}
          onPress={() => handleSelectLocation(item)}
        >
          <MapPin color={theme.colors.neutral[200]} size={18} />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text style={styles.locationDetail}>{item.country}</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => removeSavedLocation(item.name)}
          style={styles.starButton}
        >
          <Star 
            color={theme.colors.accent[300]} 
            fill={theme.colors.accent[300]}
            size={20} 
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  const backgroundCondition = currentWeather?.condition || 'clear';
  const timeOfDay = currentWeather?.timeOfDay || 'day';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      <BackgroundGradient 
        condition={backgroundCondition} 
        timeOfDay={timeOfDay} 
        opacity={0.7}
      />
      
      <Animated.View 
        entering={FadeIn.duration(400)}
        style={styles.content}
      >
        <Text style={styles.title}>Locations</Text>
        
        <View style={styles.searchContainer}>
          <BlurView intensity={50} style={styles.searchInputWrapper} tint="dark">
            <Search color={theme.colors.neutral[400]} size={20} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search city..."
              placeholderTextColor={theme.colors.neutral[400]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                <X color={theme.colors.neutral[400]} size={18} />
              </TouchableOpacity>
            )}
          </BlurView>
          
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={handleSearch}
            disabled={isSearching || searchQuery.trim().length === 0}
          >
            {isSearching ? (
              <ActivityIndicator size="small" color={theme.colors.neutral[100]} />
            ) : (
              <Text style={styles.searchButtonText}>Search</Text>
            )}
          </TouchableOpacity>
        </View>
        
        {searchQuery.length > 0 && searchResults.length > 0 && (
          <Animated.View entering={FadeIn.duration(400)} style={styles.resultsContainer}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            <FlatList
              data={searchResults}
              renderItem={renderLocationItem}
              keyExtractor={(item) => `search-${item.name}-${item.country}`}
              showsVerticalScrollIndicator={false}
              style={styles.list}
            />
          </Animated.View>
        )}
        
        {searchQuery.length === 0 && savedLocations.length > 0 && (
          <Animated.View entering={FadeIn.duration(400)} style={styles.resultsContainer}>
            <Text style={styles.sectionTitle}>Saved Locations</Text>
            <FlatList
              data={savedLocations}
              renderItem={renderSavedLocationItem}
              keyExtractor={(item) => `saved-${item.name}-${item.country}`}
              showsVerticalScrollIndicator={false}
              style={styles.list}
            />
          </Animated.View>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    color: theme.colors.neutral[100],
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    height: 50,
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: theme.colors.neutral[100],
    paddingHorizontal: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  clearButton: {
    padding: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: theme.colors.primary[600],
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: theme.colors.neutral[100],
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: theme.colors.neutral[200],
    marginBottom: 12,
  },
  resultsContainer: {
    flex: 1,
    marginBottom: 100,
  },
  list: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    borderRadius: 12,
    marginBottom: 12,
  },
  locationContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  locationName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.neutral[100],
  },
  locationDetail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.neutral[300],
  },
  starButton: {
    padding: 8,
  },
});