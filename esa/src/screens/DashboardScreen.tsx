import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { ChevronLeft, CloudSun, Calendar, HeartPulse, Landmark, Sprout } from 'lucide-react-native';
import ScreenWrapper from '../components/ScreenWrapper';

interface DashboardScreenProps {
  navigation: any;
}

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  return (
    <ScreenWrapper navigation={navigation}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={24} color="#064e3b" />
          </Pressable>
          <Text style={styles.headerTitle}>Farmer Dashboard</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Weather Forecast Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <CloudSun size={24} color="#059669" />
              <Text style={styles.cardTitle}>Weather advisory</Text>
            </View>
            <View style={styles.weatherBody}>
              <View>
                <Text style={styles.temp}>29°C</Text>
                <Text style={styles.weatherCondition}>Partly Cloudy • Humidity 65%</Text>
              </View>
              <Text style={styles.weatherTip}>Perfect for watering crops late afternoon.</Text>
            </View>
          </View>

          {/* Dynamic Status / Actions */}
          <Text style={styles.sectionTitle}>Farm Diagnostics</Text>
          
          <View style={styles.grid}>
            <View style={[styles.gridItem, { borderColor: '#10b981' }]}>
              <HeartPulse size={28} color="#10b981" />
              <Text style={styles.gridTitle}>Crop Health</Text>
              <Text style={styles.gridVal}>Good</Text>
              <Text style={styles.gridSub}>No pests detected</Text>
            </View>

            <View style={[styles.gridItem, { borderColor: '#f59e0b' }]}>
              <Landmark size={28} color="#f59e0b" />
              <Text style={styles.gridTitle}>Finance</Text>
              <Text style={styles.gridVal}>₹12,450</Text>
              <Text style={styles.gridSub}>This month's profit</Text>
            </View>
          </View>

          {/* Tasks Section */}
          <Text style={styles.sectionTitle}>To-Do List</Text>
          
          <View style={styles.taskCard}>
            <View style={styles.taskItem}>
              <View style={styles.checkbox} />
              <View>
                <Text style={styles.taskTitle}>Apply organic pesticide to Cotton</Text>
                <Text style={styles.taskDue}>Due by 6:00 PM</Text>
              </View>
            </View>
            
            <View style={[styles.taskItem, styles.taskBorder]}>
              <View style={styles.checkbox} />
              <View>
                <Text style={styles.taskTitle}>Check soil moisture in Field B</Text>
                <Text style={styles.taskDue}>Tomorrow morning</Text>
              </View>
            </View>
          </View>

          {/* Expert Advisory Banner */}
          <View style={styles.advisoryBanner}>
            <Sprout size={24} color="#ffffff" />
            <View style={{ flex: 1 }}>
              <Text style={styles.advisoryBannerTitle}>Need Professional Advice?</Text>
              <Text style={styles.advisoryBannerText}>Talk to an expert call center instantly.</Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#e6f4ea',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#064e3b',
  },
  scrollContainer: {
    padding: 20,
    gap: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  weatherBody: {
    gap: 12,
  },
  temp: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
  },
  weatherCondition: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  weatherTip: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '500',
    backgroundColor: '#ecfdf5',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    gap: 8,
  },
  gridTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  gridVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  gridSub: {
    fontSize: 11,
    color: '#9ca3af',
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  taskBorder: {
    borderTopWidth: 1,
    borderColor: '#f3f4f6',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#d1d5db',
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  taskDue: {
    fontSize: 11,
    color: '#ef4444',
    marginTop: 2,
  },
  advisoryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    borderRadius: 20,
    padding: 20,
    gap: 16,
    marginTop: 8,
  },
  advisoryBannerTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  advisoryBannerText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    marginTop: 2,
  },
});
