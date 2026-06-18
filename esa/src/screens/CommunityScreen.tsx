import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { ChevronLeft, MessageSquare, ThumbsUp, PlusCircle } from 'lucide-react-native';
import ScreenWrapper from '../components/ScreenWrapper';

interface CommunityScreenProps {
  navigation: any;
}

const demoPosts = [
  {
    id: '1',
    author: 'Ramesh Reddy',
    village: 'Tadepalli',
    content: 'Used the SRI planting method for my Paddy rice crop this season. Observed 20% higher yield output! Ask me if you need details on spacing or seedling age.',
    likes: 24,
    comments: 8,
  },
  {
    id: '2',
    author: 'Lakshmi',
    village: 'Ponnur',
    content: 'Need recommendation for high quality organic insecticide for Chilli crop leaf curl pest. Anyone has good results with neem oil blends?',
    likes: 15,
    comments: 12,
  },
  {
    id: '3',
    author: 'Venkatesh',
    village: 'Sattenapalli',
    content: 'Chilli prices touched ₹18,000 per quintal today in Guntur market. Up by ₹2,000 compared to last month!',
    likes: 32,
    comments: 5,
  },
];

export default function CommunityScreen({ navigation }: CommunityScreenProps) {
  return (
    <ScreenWrapper navigation={navigation}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={24} color="#059669" />
          </Pressable>
          <Text style={styles.headerTitle}>Kisan Community</Text>
          <Pressable style={styles.iconButton}>
            <PlusCircle size={24} color="#059669" />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.forumAlert}>
            <Text style={styles.forumAlertText}>
              Share crop updates, ask farm related queries, and get help from fellow farmers.
            </Text>
          </View>

          {demoPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{post.author[0]}</Text>
                </View>
                <View>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <Text style={styles.authorLoc}>{post.village}</Text>
                </View>
              </View>
              
              <Text style={styles.postContent}>{post.content}</Text>
              
              <View style={styles.actionsBar}>
                <Pressable style={styles.actionItem}>
                  <ThumbsUp size={16} color="#6b7280" />
                  <Text style={styles.actionText}>{post.likes} Likes</Text>
                </Pressable>
                <Pressable style={styles.actionItem}>
                  <MessageSquare size={16} color="#6b7280" />
                  <Text style={styles.actionText}>{post.comments} Comments</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  scrollContainer: {
    padding: 20,
    gap: 16,
  },
  forumAlert: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#d1fae5',
    padding: 16,
    borderRadius: 16,
  },
  forumAlertText: {
    fontSize: 13,
    color: '#065f46',
    lineHeight: 18,
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e6f4ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#059669',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  authorLoc: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  postContent: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
  },
  actionsBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
    gap: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
});
