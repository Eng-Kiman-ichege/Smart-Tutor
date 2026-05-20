import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  Image as RNImage,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLearningStore } from '../../store/useLearningStore';
import { lessons } from '../../data/lessons';
import { units } from '../../data/units';
import { languages } from '../../data/languages';

const { width } = Dimensions.get('window');
const PURPLE = '#6C5CE7';
const PURPLE_LIGHT = '#F0EEFF';

// Lesson images — use picsum seeds so we always get a stable picture
// Hero image: use local palace asset
const HERO_IMAGE = require('../../assets/images/palace.png');
const MASCOT_IMAGE = require('../../assets/images/mascot-welcome.png');

export default function LearnScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'lessons' | 'practice'>('lessons');

  const {
    selectedLanguage,
    completedLessonIds,
    inProgressLessonIds,
    setSelectedLanguage,
  } = useLearningStore();

  // Make sure a language is always set
  React.useEffect(() => {
    if (!selectedLanguage) {
      setSelectedLanguage(languages[0].id);
    }
  }, []);

  if (!selectedLanguage) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.centered}>
          <Text style={styles.loadingText}>Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Get the first unit for this language
  const languageUnits = units.filter((u) => u.languageId === selectedLanguage);
  const currentUnit = languageUnits[0];

  if (!currentUnit) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.centered}>
          <Text style={styles.loadingText}>No lessons available yet.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Lessons belonging to this unit, sorted by order
  const unitLessons = lessons
    .filter((l) => l.unitId === currentUnit.id)
    .sort((a, b) => a.order - b.order);

  const completedCount = unitLessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;

  const unitIndex = languageUnits.indexOf(currentUnit) + 1;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ── Header ────────────────────────────────────────── */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color="#1a1a2e" />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {currentUnit.title}
          </Text>
          <Text style={styles.headerSubtitle}>
            Unit {unitIndex} • {completedCount} / {unitLessons.length} lessons
          </Text>
        </View>
        <Ionicons name="bookmark-outline" size={24} color={PURPLE} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ── Hero banner ───────────────────────────────────── */}
            <RNImage
              source={HERO_IMAGE}
              style={styles.hero}
            />

        {/* ── Lessons / Practice tabs ───────────────────────── */}
        <View style={styles.tabRow}>
          <Pressable
            style={styles.tabBtn}
            onPress={() => setActiveTab('lessons')}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'lessons' && styles.tabLabelActive,
              ]}
            >
              Lessons
            </Text>
            {activeTab === 'lessons' && <View style={styles.tabUnderline} />}
          </Pressable>

          <Pressable
            style={styles.tabBtn}
            onPress={() => setActiveTab('practice')}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'practice' && styles.tabLabelActive,
              ]}
            >
              Practice
            </Text>
            {activeTab === 'practice' && <View style={styles.tabUnderline} />}
          </Pressable>
        </View>

        {/* ── Lesson list ───────────────────────────────────── */}
        {activeTab === 'lessons' && (
          <View style={styles.lessonList}>
            {unitLessons.map((lesson, index) => {
              const isCompleted = completedLessonIds.includes(lesson.id);
              const isInProgress = inProgressLessonIds.includes(lesson.id);
              const isLocked = !isCompleted && !isInProgress;

              return (
                <Pressable
                  key={lesson.id}
                  onPress={() => router.push(`/lesson/${lesson.id}` as any)}
                  style={[
                    styles.card,
                    isInProgress && styles.cardInProgress,
                  ]}
                >
                  <View style={styles.cardBody}>
                    <Text
                      style={[
                        styles.lessonNumber,
                        isInProgress && { color: PURPLE },
                      ]}
                    >
                      Lesson {index + 1}
                    </Text>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>

                    {isInProgress && (
                      <Text style={styles.inProgressLabel}>In progress</Text>
                    )}
                    {isLocked && (
                      <Text style={styles.lockedLabel}>
                        0 / {lesson.activities.length || 6} lessons
                      </Text>
                    )}
                  </View>

                  {/* Right icon */}
                  {isCompleted && (
                    <View style={styles.completedBadge}>
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    </View>
                  )}
                  {isInProgress && (
                    <RNImage
                      source={MASCOT_IMAGE}
                      style={styles.mascotThumb}
                    />
                  )}
                  {isLocked && (
                    <View style={styles.lockIcon}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#b0b0b0"
                      />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        )}

        {activeTab === 'practice' && (
          <View style={styles.centered}>
            <Text style={styles.loadingText}>Practice coming soon! 🎯</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
  },

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backBtn: {
    marginRight: 8,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1a1a2e',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#9b9bb4',
    marginTop: 2,
  },

  // ── Hero
  hero: {
    width,
    height: 220,
  },

  // ── Tabs
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f5',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#b0b0c8',
  },
  tabLabelActive: {
    color: PURPLE,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 3,
    borderRadius: 2,
    backgroundColor: PURPLE,
  },

  // ── Lesson cards
  lessonList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#ebebf5',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardInProgress: {
    borderColor: PURPLE,
    backgroundColor: PURPLE_LIGHT,
  },
  cardBody: {
    flex: 1,
    marginRight: 12,
  },
  lessonNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9b9bb4',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    lineHeight: 22,
  },
  inProgressLabel: {
    fontSize: 13,
    color: PURPLE,
    fontWeight: '600',
    marginTop: 4,
  },
  lockedLabel: {
    fontSize: 12,
    color: '#b0b0c8',
    marginTop: 4,
  },

  // ── Status icons
  completedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotThumb: {
    width: 52,
    height: 52,
  },
  lockIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#d5d5e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
