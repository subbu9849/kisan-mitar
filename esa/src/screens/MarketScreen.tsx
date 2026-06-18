import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, SafeAreaView, TextInput } from 'react-native';
import { ChevronLeft, Search, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react-native';
import ScreenWrapper from '../components/ScreenWrapper';

interface MarketScreenProps {
  navigation: any;
}

const mockMandiPrices = [
  { id: '1', name: 'Paddy (Rice)', price: '₹2,180', unit: 'Quintal', change: '+₹45', up: true, location: 'Mandi A' },
  { id: '2', name: 'Tomatoes', price: '₹3,500', unit: 'Quintal', change: '-₹120', up: false, location: 'Mandi B' },
  { id: '3', name: 'Cotton', price: '₹6,800', unit: 'Quintal', change: '+₹150', up: true, location: 'Mandi A' },
  { id: '4', name: 'Onions', price: '₹1,950', unit: 'Quintal', change: '-₹10', up: false, location: 'Mandi C' },
  { id: '5', name: 'Wheat', price: '₹2,275', unit: 'Quintal', change: '+₹30', up: true, location: 'Mandi B' },
];

export default function MarketScreen({ navigation }: MarketScreenProps) {
  return (
    <ScreenWrapper navigation={navigation}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={24} color="#78350f" />
          </Pressable>
          <Text style={styles.headerTitle}>Mandi Market Prices</Text>
          <Pressable style={styles.iconButton}>
            <RefreshCw size={20} color="#78350f" />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Search size={20} color="#9ca3af" />
            <TextInput
              placeholder="Search crop or mandi..."
              placeholderTextColor="#9ca3af"
              style={styles.searchInput}
            />
          </View>

          {/* Overview Banner */}
          <View style={styles.overviewCard}>
            <Text style={styles.overviewLabel}>Market Trend Today</Text>
            <View style={styles.trendRow}>
              <Text style={styles.trendStatus}>Bullish</Text>
              <TrendingUp size={24} color="#10b981" />
            </View>
            <Text style={styles.overviewDesc}>Cereals and cotton show strong price growth today due to export demand.</Text>
          </View>

          {/* Price List */}
          <Text style={styles.sectionTitle}>Live Commodities</Text>
          
          <View style={styles.listContainer}>
            {mockMandiPrices.map((item) => (
              <View key={item.id} style={styles.priceItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemLoc}>{item.location} • Per {item.unit}</Text>
                </View>
                <View style={styles.priceAction}>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  <View style={[styles.badge, item.up ? styles.badgeUp : styles.badgeDown]}>
                    {item.up ? (
                      <TrendingUp size={12} color="#10b981" />
                    ) : (
                      <TrendingDown size={12} color="#ef4444" />
                    )}
                    <Text style={[styles.badgeText, item.up ? styles.textUp : styles.textDown]}>
                      {item.change}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fffdf9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#fef3c7',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#fef3c7',
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#78350f',
  },
  scrollContainer: {
    padding: 20,
    gap: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  overviewCard: {
    backgroundColor: '#fffbeb',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fef3c7',
    padding: 20,
    gap: 8,
  },
  overviewLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#b45309',
    textTransform: 'uppercase',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trendStatus: {
    fontSize: 24,
    fontWeight: '800',
    color: '#92400e',
  },
  overviewDesc: {
    fontSize: 13,
    color: '#78350f',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginTop: 8,
  },
  listContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
  },
  priceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  itemLoc: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  priceAction: {
    alignItems: 'flex-end',
    gap: 6,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  badgeUp: {
    backgroundColor: '#d1fae5',
  },
  badgeDown: {
    backgroundColor: '#fee2e2',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textUp: {
    color: '#065f46',
  },
  textDown: {
    color: '#991b1b',
  },
});
