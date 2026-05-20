import "../global.css";
import { Stack, useSegments, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "../utils/cache";
import { View, Text } from "react-native";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

import { useLearningStore } from "../store/useLearningStore";
import { useState } from "react";

function AuthProtect() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const selectedLanguage = useLearningStore((state) => state.selectedLanguage);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Check if store has hydrated from AsyncStorage
    const unsubFinishHydration = useLearningStore.persist.onFinishHydration(() => setHydrated(true));
    
    if (useLearningStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => {
      unsubFinishHydration();
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !hydrated) return;

    const currentSegment = segments[0];
    const isAuthPage = currentSegment === 'onboarding' || currentSegment === 'signin' || currentSegment === 'signup';

    if (!isSignedIn && !isAuthPage) {
      // Not signed in, trying to access a protected page -> redirect to onboarding
      router.replace("/onboarding");
    } else if (isSignedIn) {
      if (!selectedLanguage && currentSegment !== 'language-selection') {
        // Authenticated but no language selected -> force redirect to language selection
        router.replace("/language-selection");
      } else if (selectedLanguage && isAuthPage) {
        // Authenticated and has language selected -> redirect away from auth pages to home
        router.replace("/");
      }
    }
  }, [isLoaded, hydrated, isSignedIn, selectedLanguage, segments]);

  if (!isLoaded || !hydrated) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (!publishableKey) {
    return (
      <View className="flex-1 bg-[#0D132B] justify-center items-center px-6">
        <View className="bg-[#1A2342] border border-[#2B3564] rounded-[28px] p-6 w-full max-w-[340px] shadow-2xl items-center">
          <View className="w-12 h-12 bg-red-500/10 rounded-full items-center justify-center mb-4">
            <Text className="text-[24px]">⚠️</Text>
          </View>
          <Text className="text-[20px] font-poppins-bold text-white text-center tracking-tight">
            Clerk Key Missing
          </Text>
          <Text className="text-body-sm font-poppins text-gray-400 text-center mt-3 leading-[1.6]">
            To run authentication, please add your Clerk Publishable Key in a <Text className="font-poppins-semibold text-white">.env</Text> file in the project root:
          </Text>
          <View className="bg-[#090D1F] border border-border/20 rounded-xl p-3 w-full mt-4">
            <Text className="text-[12px] font-mono text-[#D4D4D8] select-all">
              EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
            </Text>
          </View>
          <Text className="text-[11px] font-poppins text-gray-500 text-center mt-4">
            Restart the server after adding the file.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <AuthProtect />
    </ClerkProvider>
  );
}
