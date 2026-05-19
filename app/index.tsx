import { View, Text, SafeAreaView, Pressable, Image } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo-vector-icons';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Top Logo */}
      <View className="flex-row items-center justify-center mt-4">
        <Image 
          source={require('../assets/images/moscot-logo.png')} 
          className="w-10 h-10"
          resizeMode="contain"
        />
        <Text className="text-h2 font-poppins-bold text-text-primary ml-2 tracking-tight">muolingo</Text>
      </View>

      <View className="flex-1 px-6 justify-center mt-8">
        {/* Text Section */}
        <View className="mb-8">
          <Text className="text-h1 font-poppins-bold text-text-primary">
            Your AI language{'\n'}<Text className="text-lingua-purple">teacher.</Text>
          </Text>
          <Text className="text-body-lg font-poppins text-text-secondary mt-4 leading-[1.6]">
            Real conversations, personalized{'\n'}lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Mascot Image */}
        <View className="items-center flex-1 justify-center min-h-[300px]">
          <Image 
            source={require('../assets/images/mascot-welcome.png')} 
            className="w-full max-w-[320px] aspect-square"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Bottom Button */}
      <View className="px-6 pb-12 pt-4">
        <Link href="/design-system" asChild>
          <Pressable 
            className="bg-lingua-purple flex-row items-center justify-center py-4 rounded-2xl active:opacity-80 relative"
          >
            <Text className="text-h4 font-poppins-semibold text-white">Get Started</Text>
            <View className="absolute right-6">
              <Ionicons name="chevron-forward" size={24} color="white" />
            </View>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
