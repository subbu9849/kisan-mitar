import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { ChevronLeft, Sprout, HeartPulse, ShieldAlert, FileSpreadsheet } from 'lucide-react-native';
import ScreenWrapper from '../components/ScreenWrapper';

interface FarmScreenProps {
  navigation: any;
}

export default function FarmScreen({ navigation }: FarmScreenProps) {
  const tasks = [
    { title: 'Fertilizer Application', description: 'Apply NPK mixture to Paddy Field A', status: 'Pending', time: 'Tomorrow' },
    { title: 'Irrigation Check', description: 'Cotton crop is entering flowering stage, check moisture', status: 'Completed', time: 'Completed today' },
    { title: 'Soil testing', description: 'Submit soil samples of Field B to local lab', status: 'Pending', time: 'In 3 days' },
  ];

  return (
    <ScreenWrapper navigation={navigation}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={24} color="#047857" />
          </Pressable>
          <Text style={styles.headerTitle}>Farm & Crop Manager</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Farm stats */}
          <View style={styles.dashboardStats}>
            <View style={styles.statItem}>
              <Sprout size={28} color="#059669" />
              <Text style={styles.statVal}>3</Text>
              <Text style={styles.statLabel}>Active Crops</Text>
            </View>
            <View style={styles.statItem}>
              <HeartPulse size={28} color="#059669" />
              <Text style={styles.statVal}>98%</Text>
              <Text style={styles.statLabel}>Health Index</Text>
            </View>
            <View style={styles.statItem}>
              <FileSpreadsheet size={28} color="#059669" />
              <Text style={styles.statVal}>₹4.2k</Text>
              <Text style={styles.statLabel}>Logs Value</Text>
            </View>
          </View>

          {/* Crops List */}
          <Text style={styles.sectionTitle}>Active Crop Cycles</Text>
          <View style={styles.cropCard}>
            <View style={styles.cropHeader}>
              <Text style={styles.cropTitle}>Paddy (Rice)</Text>
              <Text style={styles.cropStage}>Tillering Stage</Text>
            </View>
            <Text style={styles.cropDetails}>Planted: April 10 • Duration: 120 days</Text>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: '60%' }]} />
            </View>
          </View>

          <View style={styles.cropCard}>
            <View style={styles.cropHeader}>
              <Text style={styles.cropTitle}>Cotton</Text>
              <Text style={styles.cropStage}>Flowering Stage</Text>
            </View>
            <Text style={styles.cropDetails}>Planted: March 15 • Duration: 160 days</Text>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: '80%', backgroundColor: '#eab308' }]} />
            </View>
          </View>

          {/* Pending Tasks */}
          <Text style={styles.sectionTitle}>Scheduled Activities</Text>
          <View style={styles.taskList}>
            {tasks.map((task, idx) => (
              <View key={idx} style={[styles.taskItem, idx !== tasks.length - 1 && styles.borderBottom]}>
                <View style={styles.taskLeft}>
                  <ShieldAlert size={20} color={task.status === 'Pending' ? '#f59e0b' : '#10b981'} />
                  <View>
                    <Text style={styles.taskTitleText}>{task.title}</Text>
                    <Text style={styles.taskDescText}>{task.description}</Text>
                  </View>
                </View>
                <Text style={[styles.taskStatusText, task.status === 'Completed' ? styles.statusGreen : styles.statusAmber]}>
                  {task.time}
                </Text>
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
    backgroundColor: '#f0fdf4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#d1fae5',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#d1fae5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#047857',
  },
  scrollContainer: {
    padding: 20,
    gap: 20,
  },
  dashboardStats: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1fae5',
    shadowColor: '#047857',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    gap: 6,
  },
  statVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 8,
  },
  cropCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 8,
  },
  cropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cropTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  cropStage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cropDetails: {
    fontSize: 13,
    color: '#64748b',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  taskList: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  taskTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  taskDescText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  taskStatusText: {
    fontSize: 11,
    fontWeight: '700',
    width: 90,
    textAlign: 'right',
  },
  statusGreen: {
    color: '#059669',
  },
  statusAmber: {
    color: '#d97706',
  },
});
