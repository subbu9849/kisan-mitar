import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { CloudSun, Droplets, Wind, CloudRain, Sun, Cloud, Thermometer, ChevronLeft } from 'lucide-react-native';
import ScreenWrapper from '../components/ScreenWrapper';

interface WeatherScreenProps {
  navigation: any;
}

export default function WeatherScreen({ navigation }: WeatherScreenProps) {
  const forecast = [
    { day: 'Today', temp: '32°C', icon: CloudSun, label: 'Partly Cloudy' },
    { day: 'Tomorrow', temp: '30°C', icon: CloudRain, label: 'Light Rain' },
    { day: 'Saturday', temp: '33°C', icon: Sun, label: 'Sunny' },
    { day: 'Sunday', temp: '31°C', icon: Cloud, label: 'Cloudy' },
    { day: 'Monday', temp: '29°C', icon: CloudRain, label: 'Heavy Rain' },
  ];

  return (
    <ScreenWrapper navigation={navigation}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={24} color="#0369a1" />
          </Pressable>
          <Text style={styles.headerTitle}>Weather Forecast</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Main Weather Card */}
          <View style={styles.mainCard}>
            <Text style={styles.location}>Guntur, AP</Text>
            <View style={styles.tempRow}>
              <CloudSun size={64} color="#f59e0b" />
              <View>
                <Text style={styles.tempText}>32°C</Text>
                <Text style={styles.conditionText}>Partly Cloudy • Feels like 34°C</Text>
              </View>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Droplets size={20} color="#0ea5e9" />
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailVal}>65%</Text>
              </View>
              <View style={styles.detailItem}>
                <Wind size={20} color="#64748b" />
                <Text style={styles.detailLabel}>Wind</Text>
                <Text style={styles.detailVal}>12 km/h</Text>
              </View>
              <View style={styles.detailItem}>
                <CloudRain size={20} color="#3b82f6" />
                <Text style={styles.detailLabel}>Rainfall</Text>
                <Text style={styles.detailVal}>2.4 mm</Text>
              </View>
            </View>
          </View>

          {/* Advisory Card */}
          <View style={styles.advisoryCard}>
            <Text style={styles.advisoryTitle}>Agriculture Advisory</Text>
            <Text style={styles.advisoryText}>
              Light rain expected tomorrow evening. Postpone any fertilizer spraying or harvesting operations for the next 24 hours. Keep crop yields in dry sheds.
            </Text>
          </View>

          {/* 5-Day Forecast */}
          <Text style={styles.sectionTitle}>5-Day Forecast</Text>
          <View style={styles.forecastList}>
            {forecast.map((item, index) => {
              const Icon = item.icon;
              return (
                <View key={index} style={[styles.forecastItem, index !== forecast.length - 1 && styles.borderBottom]}>
                  <Text style={styles.forecastDay}>{item.day}</Text>
                  <View style={styles.forecastRight}>
                    <Icon size={20} color="#f59e0b" />
                    <Text style={styles.forecastTemp}>{item.temp}</Text>
                    <Text style={styles.forecastLabel}>{item.label}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#e0f2fe',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#e0f2fe',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0369a1',
  },
  scrollContainer: {
    padding: 20,
    gap: 20,
  },
  mainCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e0f2fe',
    shadowColor: '#0284c7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  location: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0284c7',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginVertical: 20,
  },
  tempText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#0f172a',
  },
  conditionText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 20,
  },
  detailItem: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  detailVal: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  advisoryCard: {
    backgroundColor: '#fffbeb',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fef3c7',
    padding: 20,
    gap: 8,
  },
  advisoryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#b45309',
  },
  advisoryText: {
    fontSize: 13,
    color: '#78350f',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginTop: 8,
  },
  forecastList: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e0f2fe',
    paddingHorizontal: 20,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  forecastDay: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  forecastRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  forecastTemp: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    width: 45,
    textAlign: 'right',
  },
  forecastLabel: {
    fontSize: 12,
    color: '#64748b',
    width: 80,
  },
});
