import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useUser, useAuth } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Top-level imports for assets
import moscotLogo from '../assets/images/moscot-logo.png';

export default function ProfileScreen() {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  // Formatting signup date safely
  const formattedDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Recently';

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-4 pb-2">
        <Pressable 
          onPress={() => router.replace('/')}
          className="w-10 h-10 items-center justify-center -ml-2"
        >
          <Ionicons name="chevron-back" size={24} color="#0D132B" />
        </Pressable>
        <Text className="flex-1 text-[20px] font-poppins-semibold text-text-primary text-center mr-8 tracking-tight">
          Profile
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <View className="flex-1 justify-between py-6 px-6 sm:px-8">
          
          {/* Top Header / Branding */}
          <View className="items-center mb-6 mt-2">
            <View className="bg-surface/60 border border-border/50 px-4 py-2 rounded-full flex-row items-center gap-2 shadow-sm">
              <Image 
                source={moscotLogo} 
                className="w-8 h-8"
                contentFit="contain"
              />
              <View className="flex-row">
                <Text className="text-h3 font-poppins-bold text-text-primary tracking-tight">smart</Text>
                <Text className="text-h3 font-poppins text-lingua-purple ml-1 tracking-tight">tutor</Text>
              </View>
            </View>
          </View>

          {/* Center Main Dashboard Content */}
          <View className="flex-1 justify-center max-w-[400px] w-full self-center">
            
            {/* Title Block */}
            <View className="mb-6 items-center">
              <View className="w-16 h-16 bg-lingua-purple/10 rounded-full items-center justify-center mb-4">
                <Ionicons name="person" size={32} color="#6C4EF5" />
              </View>
              <Text className="text-[26px] font-poppins-bold text-text-primary text-center tracking-tight leading-tight">
                My Profile
              </Text>
              <Text className="text-body-md font-poppins text-text-secondary text-center mt-2 leading-[1.5] px-4">
                Manage your account settings and language learning preferences.
              </Text>
            </View>

            {/* Profile Glassmorphic Info Card */}
            <View className="bg-surface/30 border border-border/80 rounded-[28px] p-5 shadow-sm relative overflow-hidden mb-6">
              {/* Subtle Ambient Background Gradients inside the card */}
              <View className="absolute top-0 right-0 w-24 h-24 bg-lingua-purple/5 rounded-full filter blur-xl -z-10" />
              <View className="absolute bottom-0 left-0 w-24 h-24 bg-lingua-blue/5 rounded-full filter blur-xl -z-10" />

              <Text className="text-caption font-poppins-bold uppercase tracking-wider text-text-secondary mb-4">
                AUTHENTICATED PROFILE
              </Text>

              {/* Email Block */}
              <View className="flex-row items-center mb-4 pb-3 border-b border-border/40">
                <View className="w-10 h-10 bg-white border border-border/50 rounded-xl items-center justify-center mr-3.5 shadow-sm">
                  <Ionicons name="mail" size={20} color="#6C4EF5" />
                </View>
                <View className="flex-1">
                  <Text className="text-[11px] font-poppins-bold text-text-secondary uppercase tracking-wider">Email Address</Text>
                  <Text className="text-[15px] font-poppins-semibold text-text-primary truncate mt-0.5" numberOfLines={1}>
                    {user?.primaryEmailAddress?.emailAddress || 'Not Provided'}
                  </Text>
                </View>
              </View>

              {/* Clerk ID Block */}
              <View className="flex-row items-center mb-4 pb-3 border-b border-border/40">
                <View className="w-10 h-10 bg-white border border-border/50 rounded-xl items-center justify-center mr-3.5 shadow-sm">
                  <Ionicons name="finger-print" size={20} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-[11px] font-poppins-bold text-text-secondary uppercase tracking-wider">Clerk User ID</Text>
                  <Text className="text-[14px] font-mono text-text-secondary truncate mt-0.5 select-all" numberOfLines={1}>
                    {user?.id || 'Unknown'}
                  </Text>
                </View>
              </View>

              {/* Created At Block */}
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-white border border-border/50 rounded-xl items-center justify-center mr-3.5 shadow-sm">
                  <Ionicons name="calendar" size={20} color="#FF6C3B" />
                </View>
                <View className="flex-1">
                  <Text className="text-[11px] font-poppins-bold text-text-secondary uppercase tracking-wider">Member Since</Text>
                  <Text className="text-[15px] font-poppins-semibold text-text-primary mt-0.5">
                    {formattedDate}
                  </Text>
                </View>
              </View>

            </View>

          </View>

          {/* Bottom CTA Buttons */}
          <View className="pt-6 pb-4 max-w-[400px] w-full self-center gap-3">
            <Link href="/" asChild>
              <Pressable className="active:scale-[0.98] transition-all">
                <View className="bg-lingua-purple border border-lingua-purple flex-row items-center justify-center py-4 rounded-2xl active:bg-lingua-purple/90">
                  <Ionicons name="language-outline" size={20} color="#FFFFFF" className="mr-2" />
                  <Text className="text-body-lg font-poppins-semibold text-white ml-2">
                    Choose Language
                  </Text>
                </View>
              </Pressable>
            </Link>

            <Pressable 
              onPress={() => signOut()}
              className="active:scale-[0.98] transition-all"
            >
              <View className="bg-[#1A2342]/5 border border-border/60 flex-row items-center justify-center py-4 rounded-2xl active:bg-[#1A2342]/10">
                <Ionicons name="log-out-outline" size={20} color="#4B5563" className="mr-2" />
                <Text className="text-body-lg font-poppins-semibold text-gray-700 ml-2">
                  Sign Out
                </Text>
              </View>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
