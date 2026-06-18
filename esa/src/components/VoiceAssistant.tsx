import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Modal, Pressable, TextInput, ScrollView, Animated } from 'react-native';
import { Mic, X, Send, Volume2 } from 'lucide-react-native';
import * as Speech from 'expo-speech';

interface VoiceAssistantProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
}

export default function VoiceAssistant({ visible, onClose, navigation }: VoiceAssistantProps) {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Waveform animations
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.4,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  const handleSpeak = (text: string) => {
    Speech.speak(text, {
      language: 'en-IN',
      pitch: 1.0,
      rate: 0.95,
    });
  };

  const processCommand = async (text: string) => {
    setIsProcessing(true);
    setResponse('');
    const command = text.toLowerCase();

    // Mock processing / routing logic
    setTimeout(() => {
      setIsProcessing(false);
      let reply = "";
      if (command.includes('market') || command.includes('price') || command.includes('mandi')) {
        reply = "Navigating to market portal to check live commodity prices.";
        setResponse(reply);
        handleSpeak(reply);
        setTimeout(() => {
          onClose();
          navigation.navigate('Market');
        }, 1500);
      } else if (command.includes('farm') || command.includes('dashboard') || command.includes('weather')) {
        reply = "Opening your farmer dashboard.";
        setResponse(reply);
        handleSpeak(reply);
        setTimeout(() => {
          onClose();
          navigation.navigate('Dashboard');
        }, 1500);
      } else {
        reply = `I processed your request: "${text}". How else can I help you today?`;
        setResponse(reply);
        handleSpeak(reply);
      }
    }, 1200);
  };

  const startSpeech = () => {
    setIsListening(true);
    setResponse('');
    // Mocking speech recognizer starting
    setTimeout(() => {
      setIsListening(false);
      const randomCommands = ["Open Market Prices", "Show Farmer Dashboard", "Check Weather"];
      const command = randomCommands[Math.floor(Math.random() * randomCommands.length)];
      setInputText(command);
      processCommand(command);
    }, 2500);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#374151" />
            </Pressable>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
            {/* Waveform / Visual status */}
            {isListening && (
              <View style={styles.pulseContainer}>
                <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulseAnim }] }]} />
                <View style={styles.micActive}>
                  <Mic size={32} color="#ffffff" />
                </View>
                <Text style={styles.pulseText}>Listening to you...</Text>
              </View>
            )}

            {isProcessing && (
              <View style={styles.processingContainer}>
                <Text style={styles.processingText}>Analyzing request...</Text>
              </View>
            )}

            {response !== "" && (
              <View style={styles.responseCard}>
                <View style={styles.responseHeader}>
                  <Volume2 size={18} color="#059669" />
                  <Text style={styles.responseLabel}>Kisan Mitra AI</Text>
                </View>
                <Text style={styles.responseText}>{response}</Text>
              </View>
            )}
          </ScrollView>

          {/* Quick recommendations */}
          <View style={styles.quickTags}>
            <Pressable style={styles.tag} onPress={() => { setInputText("Open Market"); processCommand("Open Market"); }}>
              <Text style={styles.tagText}>"Open Market"</Text>
            </Pressable>
            <Pressable style={styles.tag} onPress={() => { setInputText("Show Dashboard"); processCommand("Show Dashboard"); }}>
              <Text style={styles.tagText}>"Show Dashboard"</Text>
            </Pressable>
          </View>

          {/* Form input footer */}
          <View style={styles.footer}>
            <Pressable onPress={startSpeech} style={styles.micButton}>
              <Mic size={24} color="#059669" />
            </Pressable>
            <TextInput
              style={styles.textInput}
              placeholder="Type your question..."
              placeholderTextColor="#9ca3af"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => {
                if (inputText.trim() !== "") {
                  processCommand(inputText);
                  setInputText('');
                }
              }}
            />
            <Pressable
              onPress={() => {
                if (inputText.trim() !== "") {
                  processCommand(inputText);
                  setInputText('');
                }
              }}
              style={styles.sendButton}
            >
              <Send size={20} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 34,
    height: '65%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 24,
    gap: 20,
  },
  pulseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  pulseRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  micActive: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  pulseText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  processingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  processingText: {
    fontSize: 14,
    color: '#6b7280',
  },
  responseCard: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#d1fae5',
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  responseLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  responseText: {
    fontSize: 15,
    color: '#065f46',
    lineHeight: 22,
  },
  quickTags: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  micButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textInput: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: '#f9fafb',
    color: '#111827',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
