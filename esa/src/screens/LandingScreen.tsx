import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sprout, ShoppingBag, Sun, Navigation } from 'lucide-react-native';
import ScreenWrapper from '../components/ScreenWrapper';

const { width } = Dimensions.get('window');

interface LandingScreenProps {
  navigation: any;
}

export default function LandingScreen({ navigation }: LandingScreenProps) {
  return (
    <ScreenWrapper navigation={navigation}>
      <LinearGradient
        colors={['#e6f4ea', '#fdf6e2']}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Sprout size={48} color="#059669" />
          </View>
          <Text style={styles.title}>Kisan Mitra</Text>
          <Text style={styles.subtitle}>Empowering Farmers, Enriching Markets</Text>
        </View>

        {/* Quick Status / Weather Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Sun size={24} color="#d97706" />
            <Text style={styles.statusTitle}>Today's Advisory</Text>
          </View>
          <Text style={styles.statusText}>
            Perfect weather for sowing. Current market demand is high for Paddy and Tomatoes.
          </Text>
        </View>

        {/* Portal Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.portalButton,
              styles.farmerButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <View style={styles.iconWrapper}>
              <Sprout size={32} color="#ffffff" />
            </View>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTitle}>Farmer Portal</Text>
              <Text style={styles.buttonDesc}>Advisories, farm logs, and tools</Text>
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.portalButton,
              styles.marketButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.navigate('Market')}
          >
            <View style={styles.iconWrapper}>
              <ShoppingBag size={32} color="#ffffff" />
            </View>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTitle}>Market Portal</Text>
              <Text style={styles.buttonDesc}>Real-time mandi prices & buyers</Text>
            </View>
          </Pressable>
        </View>

        <Text style={styles.footerText}>Version 1.0.0 (ESA Beta)</Text>
      </LinearGradient>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#064e3b',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#047857',
    marginTop: 8,
    fontWeight: '500',
  },
  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    padding: 20,
    marginVertical: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d97706',
  },
  statusText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  portalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  farmerButton: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
  },
  marketButton: {
    backgroundColor: '#f59e0b',
    shadowColor: '#f59e0b',
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  buttonDesc: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 4,
  },
  footerText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 12,
    marginTop: 20,
  },
});
