import { SafeAreaView, ScrollView, Text, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { useLearningStore } from '../store/useLearningStore';
import { lessons } from '../data/lessons';
import { units } from '../data/units';
import { Ionicons } from '@expo/vector-icons';
import { languages } from '../data/languages';

// Helper to get unit title for a lesson
const getUnitTitle = (unitId: string) => {
  const unit = units.find((u) => u.id === unitId);
  return unit?.title ?? '';
};

export default function LessonsScreen() {
  const router = useRouter();
  const { selectedLanguage, completedLessonIds, inProgressLessonIds, setSelectedLanguage } = useLearningStore();

  // Initialize selected language if not set
  React.useEffect(() => {
    if (!selectedLanguage) {
      setSelectedLanguage(languages[0].id);
    }
  }, []);

  // While the language is being set, show a loading placeholder
  if (!selectedLanguage) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-body-lg">Loading language…</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Filter lessons that belong to the selected language
  const filteredLessons = lessons.filter((lesson) => {
    const unit = units.find((u) => u.id === lesson.unitId);
    return unit?.languageId === selectedLanguage;
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <Text className="text-h2 font-poppins-bold text-text-primary mb-4">Lessons</Text>
        {filteredLessons.map((lesson) => {
          const status = completedLessonIds.includes(lesson.id)
            ? 'completed'
            : inProgressLessonIds.includes(lesson.id)
            ? 'in-progress'
            : 'locked';

          const statusColor =
            status === 'completed' ? 'bg-green-200' : status === 'in-progress' ? 'bg-yellow-200' : 'bg-gray-200';

          // Try to import a local image with the same name; fallback to Unsplash placeholder
          const localImage = null; // No local assets for lessons currently

          return (
            <Pressable
              key={lesson.id}
              onPress={() => router.push(`/lesson/${lesson.id}`)}
              className="mb-4 flex-row items-center bg-surface rounded-[20px] p-4 border border-border/40 active:opacity-90"
            >
              <View className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 items-center justify-center mr-4">
                {localImage ? (
                  <Image source={localImage} className="w-full h-full" contentFit="cover" />
                ) : (
                  <Image
                    source={{ uri: `https://picsum.photos/seed/${lesson.id}/100` }}
                    className="w-full h-full"
                    contentFit="cover"
                  />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-[16px] font-poppins-bold text-text-primary">{lesson.title}</Text>
                <Text className="text-body-sm font-poppins text-text-secondary" numberOfLines={1}>
                  {getUnitTitle(lesson.unitId)} • {lesson.description}
                </Text>
              </View>
              <View className={`w-6 h-6 rounded-full ${statusColor} items-center justify-center`}>
                {status === 'completed' && <Ionicons name="checkmark" size={16} color="green" />}
                {status === 'in-progress' && <Ionicons name="hourglass" size={16} color="orange" />}
                {status === 'locked' && <Ionicons name="lock-closed" size={16} color="gray" />}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
