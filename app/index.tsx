import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { languages } from '../data/languages';
import earthImage from '../assets/images/earth.png';

export default function HomeLanguageSelectionScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const filteredLanguages = languages.filter((lang) => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    if (selectedLanguage) {
      // In a real app, save the selected language to user profile/state here.
      // After confirmation, we can show a success toast or proceed to the lessons.
      alert(`Selected ${languages.find(l => l.id === selectedLanguage)?.name}!`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-4 pb-2">
        <Pressable 
          onPress={() => router.push('/profile')}
          className="w-10 h-10 items-center justify-center -ml-2 bg-surface border border-border/40 rounded-full active:opacity-70"
        >
          <Ionicons name="person" size={20} color="#0D132B" />
        </Pressable>
        <Text className="flex-1 text-[20px] font-poppins-semibold text-text-primary text-center mr-8 tracking-tight">
          Choose a language
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6"
      >
        {/* Search Bar */}
        <View className="flex-row items-center bg-surface/80 border border-border/60 rounded-full px-4 py-3 mt-4 mb-6 shadow-sm">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search languages"
            placeholderTextColor="#9CA3AF"
            autoCorrect={false}
            className="flex-1 ml-3 text-[16px] font-poppins text-text-primary"
            style={Platform.OS === 'web' ? { outline: 'none' } as any : undefined}
          />
        </View>

        {/* List Title */}
        <Text className="text-[18px] font-poppins-semibold text-text-primary mb-4">
          Popular
        </Text>

        {/* Language List */}
        <View className="gap-3 mb-8">
          {filteredLanguages.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            
            return (
              <Pressable
                key={lang.id}
                onPress={() => setSelectedLanguage(lang.id)}
                className={`flex-row items-center p-4 rounded-[20px] border transition-all ${
                  isSelected 
                    ? 'border-lingua-purple bg-lingua-purple/5' 
                    : 'border-border/40 bg-white'
                }`}
              >
                {/* Flag Bubble */}
                <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 shadow-sm ${
                  isSelected ? 'bg-white' : 'bg-surface'
                }`}>
                  <Text className="text-[24px]">{lang.flag}</Text>
                </View>

                {/* Language Info */}
                <View className="flex-1">
                  <Text className={`text-[17px] font-poppins-semibold ${
                    isSelected ? 'text-lingua-purple' : 'text-text-primary'
                  }`}>
                    {lang.name}
                  </Text>
                  <Text className="text-[13px] font-poppins text-text-secondary mt-0.5">
                    {lang.description}
                  </Text>
                </View>

                {/* Selection Icon */}
                <View className="ml-2">
                  {isSelected ? (
                    <Ionicons name="checkmark-circle" size={26} color="#6C4EF5" />
                  ) : (
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Confirmation Button */}
        <Pressable 
          onPress={handleConfirm}
          disabled={!selectedLanguage}
          className={`flex-row items-center justify-center py-4 rounded-2xl border transition-all ${
            selectedLanguage
              ? 'bg-lingua-purple border-lingua-purple active:bg-lingua-purple/90'
              : 'bg-surface border-border/60 opacity-50'
          }`}
        >
          <Text className={`text-[16px] font-poppins-bold tracking-wide ${
            selectedLanguage ? 'text-white' : 'text-text-secondary'
          }`}>
            Confirm Selection
          </Text>
        </Pressable>

      </ScrollView>

      {/* Earth Image at the bottom */}
      <View className="absolute bottom-0 left-0 right-0 pointer-events-none items-center justify-end h-[140px] -z-10 opacity-80">
        <Image 
          source={earthImage}
          className="w-full h-full"
          contentFit="cover"
        />
      </View>
    </SafeAreaView>
  );
}
