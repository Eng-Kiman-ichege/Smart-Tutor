import React from 'react';
import { View, Text, Pressable, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { useLearningStore } from '../../store/useLearningStore';
import { languages } from '../../data/languages';
import { units } from '../../data/units';
import { lessons } from '../../data/lessons';

// Import asset files
import streakFireImage from '../../assets/images/streak-fire.png';
import treasureImage from '../../assets/images/treasure.png';
import palaceImage from '../../assets/images/palace.png';



export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { selectedLanguage, clearLanguage } = useLearningStore();

  // Find active language configuration
  const activeLanguage = languages.find(l => l.id === selectedLanguage) || languages[0];

  // Dynamic greetings map based on selected language
  const greetings: Record<string, string> = {
    es: 'Hola',
    fr: 'Bonjour',
    ja: 'Konnichiwa',
    de: 'Hallo',
    it: 'Ciao',
  };

  const currentGreeting = greetings[activeLanguage.id] || 'Hello';
  const firstName = user?.firstName || 'Alex';

  // Find active unit and lesson for the current language
  const activeUnit = units.find(u => u.languageId === activeLanguage.id) || units[0];
  const activeLessons = lessons.filter(l => l.unitId === activeUnit.id);
  const activeLesson = activeLessons[0] || lessons[0];

  // Dynamically build the plan items based on lesson content
  const lessonTitle = activeLesson?.title || 'Greetings & Introductions';
  const wordCount = activeLesson?.activities[0]?.vocabulary?.length || 10;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <ScrollView 
        contentContainerStyle={{ 
          flexGrow: 1, 
          paddingBottom: Platform.OS === 'ios' ? 120 : 100, 
          paddingHorizontal: 24, 
          paddingTop: 12 
        }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        
        {/* Status Bar / Top Header */}
        <View className="flex-row items-center justify-between mb-6">
          {/* Left Block: Flag + User Name */}
          <View className="flex-row items-center gap-3">
            <Pressable 
              onPress={() => router.push('/language-selection')}
              className="w-11 h-11 rounded-full bg-surface border border-border/40 items-center justify-center shadow-sm active:scale-95 transition-all"
            >
              <Text className="text-[24px]">{activeLanguage.flag}</Text>
            </Pressable>
            <View>
              <Text className="text-h3 font-poppins-bold text-text-primary tracking-tight leading-none">
                {currentGreeting}, {firstName}! 👋
              </Text>
            </View>
          </View>

          {/* Right Block: Streak + Notifications */}
          <View className="flex-row items-center gap-3">
            {/* Streak Pill */}
            <View className="flex-row items-center bg-orange-50 border border-orange-100/50 px-3 py-1.5 rounded-full">
              <Image 
                source={streakFireImage}
                className="w-[20px] h-[20px] mr-1"
                contentFit="contain"
              />
              <Text className="text-[15px] font-poppins-bold text-streak">
                12
              </Text>
            </View>

            {/* Notifications Icon */}
            <Pressable className="w-10 h-10 bg-surface border border-border/40 rounded-full items-center justify-center active:scale-95 transition-all">
              <Ionicons name="notifications-outline" size={20} color="#0D132B" />
            </Pressable>
          </View>
        </View>

        {/* Daily Goal Card */}
        <View className="bg-[#FFFDF8] border border-[#FFF3E0] rounded-[28px] p-5 mb-5 flex-row items-center justify-between shadow-sm">
          <View className="flex-1 mr-4">
            <Text className="text-caption font-poppins-bold uppercase tracking-wider text-text-secondary">
              DAILY GOAL
            </Text>
            <View className="flex-row items-baseline mt-1.5 mb-3">
              <Text className="text-[28px] font-poppins-bold text-text-primary leading-none">
                15
              </Text>
              <Text className="text-body-md font-poppins text-text-secondary ml-1">
                / 20 XP
              </Text>
            </View>
            {/* Progress track */}
            <View className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <View className="h-full bg-streak rounded-full" style={{ width: '75%' }} />
            </View>
          </View>
          <View className="w-20 h-20">
            <Image 
              source={treasureImage}
              className="w-full h-full"
              contentFit="contain"
            />
          </View>
        </View>

        {/* Continue Learning Card */}
        <View className="bg-[#6C4EF5] rounded-[32px] p-6 relative overflow-hidden flex-row items-center justify-between border border-[#5B3BF6]/50 shadow-sm mb-6">
          {/* Decorative Background Gradients */}
          <View className="absolute -top-12 -left-12 w-32 h-32 bg-white/5 rounded-full filter blur-xl" />
          <View className="absolute -bottom-16 -right-16 w-40 h-40 bg-black/10 rounded-full filter blur-xl" />

          <View className="flex-1 mr-4 z-10">
            <Text className="text-caption font-poppins-bold uppercase tracking-wider text-white/70">
              CONTINUE LEARNING
            </Text>
            <Text className="text-[26px] font-poppins-bold text-white mt-1 mb-0.5 leading-none">
              {activeLanguage.name}
            </Text>
            <Text className="text-body-sm font-poppins text-white/80 mb-5">
              A1 • Unit {activeUnit.order}
            </Text>
            <Pressable 
              onPress={() => router.push('/learn')}
              className="bg-white px-5 py-2.5 rounded-full self-start active:scale-[0.97] transition-all shadow-sm"
            >
              <Text className="text-body-sm font-poppins-bold text-lingua-purple">
                Continue
              </Text>
            </Pressable>
          </View>

          <View className="w-[110px] h-[110px] z-10">
            <Image 
              source={palaceImage}
              className="w-full h-full"
              contentFit="contain"
            />
          </View>
        </View>

        {/* Today's Plan Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[19px] font-poppins-semibold text-text-primary tracking-tight">
              Today's plan
            </Text>
            <Pressable onPress={() => router.push('/learn')}>
              <Text className="text-body-md font-poppins-semibold text-lingua-purple">
                View all
              </Text>
            </Pressable>
          </View>

          {/* Plan items */}
          <View className="gap-3">
            {/* Item 1: Lesson */}
            <Pressable 
              onPress={() => router.push('/learn')}
              className="flex-row items-center bg-surface/50 border border-border/40 p-4 rounded-[22px] active:opacity-90"
            >
              <View className="w-12 h-12 rounded-2xl bg-lingua-purple items-center justify-center mr-4">
                <Ionicons name="book" size={22} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-[16px] font-poppins-semibold text-text-primary leading-tight">
                  Lesson
                </Text>
                <Text className="text-body-sm font-poppins text-text-secondary mt-0.5" numberOfLines={1}>
                  {lessonTitle}
                </Text>
              </View>
              <View className="ml-2">
                <Ionicons name="checkmark-circle" size={24} color="#6C4EF5" />
              </View>
            </Pressable>

            {/* Item 2: AI Conversation */}
            <Pressable 
              onPress={() => router.push('/ai-teacher')}
              className="flex-row items-center bg-surface/50 border border-border/40 p-4 rounded-[22px] active:opacity-90"
            >
              <View className="w-12 h-12 rounded-2xl bg-lingua-blue items-center justify-center mr-4">
                <Ionicons name="headset" size={22} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-[16px] font-poppins-semibold text-text-primary leading-tight">
                  AI Conversation
                </Text>
                <Text className="text-body-sm font-poppins text-text-secondary mt-0.5" numberOfLines={1}>
                  Talk about your day
                </Text>
              </View>
              <View className="ml-2 w-6 h-6 border border-border/70 rounded-full items-center justify-center" />
            </Pressable>

            {/* Item 3: New Words */}
            <Pressable 
              onPress={() => router.push('/learn')}
              className="flex-row items-center bg-surface/50 border border-border/40 p-4 rounded-[22px] active:opacity-90"
            >
              <View className="w-12 h-12 rounded-2xl bg-streak items-center justify-center mr-4">
                <Ionicons name="flash" size={22} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-[16px] font-poppins-semibold text-text-primary leading-tight">
                  New words
                </Text>
                <Text className="text-body-sm font-poppins text-text-secondary mt-0.5" numberOfLines={1}>
                  {wordCount} words
                </Text>
              </View>
              <View className="ml-2 w-6 h-6 border border-border/70 rounded-full items-center justify-center" />
            </Pressable>
          </View>
        </View>

        {/* Next Up Section */}
        <View className="flex-row items-center bg-[#EBF9F1] border border-[#D1F2DE] p-5 rounded-[28px] shadow-sm mb-4">
          <View className="flex-1 mr-4">
            <Text className="text-caption font-poppins-bold uppercase tracking-wider text-[#1DA35A]">
              NEXT UP
            </Text>
            <Text className="text-[18px] font-poppins-bold text-text-primary mt-1 mb-0.5 leading-none">
              AI Video Call
            </Text>
            <Text className="text-body-sm font-poppins text-text-secondary">
              Practice speaking
            </Text>
          </View>
          
          <View className="flex-row items-center gap-2">
            <View className="w-14 h-14 rounded-full border-2 border-white shadow-sm overflow-hidden bg-surface">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' }}
                className="w-full h-full"
                contentFit="cover"
              />
            </View>
            <Pressable 
              onPress={() => router.push('/ai-teacher')}
              className="w-10 h-10 rounded-full bg-[#21C16B] items-center justify-center shadow-md active:scale-95 transition-all"
            >
              <Ionicons name="videocam" size={18} color="white" />
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={() => {
            clearLanguage();
            router.replace('/language-selection');
          }}
          className="mt-4 w-full bg-lingua-purple px-4 py-2.5 rounded-full items-center justify-center active:scale-95 transition-all"
        >
          <Text className="text-body-sm font-poppins-bold text-white">Clear Language (Test)</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}
