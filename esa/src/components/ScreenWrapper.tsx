import React, { useState } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Mic } from 'lucide-react-native';
import VoiceAssistant from './VoiceAssistant';

interface ScreenWrapperProps {
  children: React.ReactNode;
  navigation: any;
}

export default function ScreenWrapper({ children, navigation }: ScreenWrapperProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {children}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          pressed && styles.fabPressed,
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Mic size={24} color="#ffffff" />
      </Pressable>

      <VoiceAssistant
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 999,
  },
  fabPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
});
