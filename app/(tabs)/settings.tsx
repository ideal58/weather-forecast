import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useWeather } from '@/context/WeatherContext';
import { useSettings } from '@/hooks/useSettings';
import BackgroundGradient from '@/components/BackgroundGradient';
import { Thermometer, Droplets, Wind, Compass, Bell, CircleHelp as HelpCircle, Shield, ExternalLink } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function SettingsScreen() {
  const { currentWeather } = useWeather();
  const { 
    settings, 
    toggleTemperatureUnit, 
    toggleWindSpeedUnit,
    toggleNotifications,
    toggleWeatherAlerts
  } = useSettings();
  
  const backgroundCondition = currentWeather?.condition || 'clear';
  const timeOfDay = currentWeather?.timeOfDay || 'day';

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    description: string,
    value?: boolean,
    onToggle?: () => void
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIconContainer}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      {onToggle && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: theme.colors.neutral[700], true: theme.colors.primary[600] }}
          thumbColor={value ? theme.colors.primary[300] : theme.colors.neutral[400]}
          ios_backgroundColor={theme.colors.neutral[700]}
        />
      )}
    </View>
  );

  const renderLinkItem = (
    icon: React.ReactNode,
    title: string,
    description: string,
  ) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingIconContainer}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <ExternalLink size={20} color={theme.colors.neutral[400]} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <BackgroundGradient 
        condition={backgroundCondition} 
        timeOfDay={timeOfDay} 
        opacity={0.7}
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(500)} style={styles.headerContainer}>
          <Text style={styles.title}>Settings</Text>
        </Animated.View>
        
        <Animated.View 
          entering={FadeIn.delay(100).duration(500)} 
          style={styles.sectionContainer}
        >
          <Text style={styles.sectionTitle}>Units</Text>
          <BlurView intensity={30} tint="dark" style={styles.settingsGroup}>
            {renderSettingItem(
              <Thermometer size={24} color={theme.colors.primary[400]} />,
              "Temperature",
              settings.temperatureUnit === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)',
              settings.temperatureUnit === 'celsius',
              toggleTemperatureUnit
            )}
            
            {renderSettingItem(
              <Wind size={24} color={theme.colors.primary[400]} />,
              "Wind Speed",
              settings.windSpeedUnit === 'kph' ? 'Kilometers per hour (km/h)' : 'Miles per hour (mph)',
              settings.windSpeedUnit === 'kph',
              toggleWindSpeedUnit
            )}
          </BlurView>
        </Animated.View>
        
        <Animated.View 
          entering={FadeIn.delay(200).duration(500)} 
          style={styles.sectionContainer}
        >
          <Text style={styles.sectionTitle}>Notifications</Text>
          <BlurView intensity={30} tint="dark" style={styles.settingsGroup}>
            {renderSettingItem(
              <Bell size={24} color={theme.colors.primary[400]} />,
              "Push Notifications",
              "Daily weather updates and forecasts",
              settings.notifications,
              toggleNotifications
            )}
            
            {renderSettingItem(
              <Shield size={24} color={theme.colors.primary[400]} />,
              "Weather Alerts",
              "Severe weather warnings for your location",
              settings.weatherAlerts,
              toggleWeatherAlerts
            )}
          </BlurView>
        </Animated.View>
        
        <Animated.View 
          entering={FadeIn.delay(300).duration(500)} 
          style={styles.sectionContainer}
        >
          <Text style={styles.sectionTitle}>About</Text>
          <BlurView intensity={30} tint="dark" style={styles.settingsGroup}>
            {renderLinkItem(
              <HelpCircle size={24} color={theme.colors.primary[400]} />,
              "Help & Support",
              "Get assistance with using the app"
            )}
            
            {renderLinkItem(
              <Compass size={24} color={theme.colors.primary[400]} />,
              "Data Sources",
              "Information about our weather data providers"
            )}
          </BlurView>
        </Animated.View>
        
        <Animated.View 
          entering={FadeIn.delay(400).duration(500)} 
          style={styles.appInfoContainer}
        >
          <Text style={styles.appInfoText}>Weather Forecast App v1.0.0</Text>
          <Text style={styles.appInfoText}>© 2025 Weather App</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    color: theme.colors.neutral[100],
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: theme.colors.neutral[200],
    marginBottom: 12,
  },
  settingsGroup: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.neutral[100],
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.neutral[300],
  },
  appInfoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  appInfoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.neutral[400],
    marginBottom: 4,
  },
});