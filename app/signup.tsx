import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Pressable, 
  TextInput, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useSignUp, useSSO } from '@clerk/expo';
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';
import VerificationModal from '../components/VerificationModal';

// Static asset import
import mascotAuth from '../assets/images/mascot-auth.png';

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { startSSOFlow } = useSSO();
  useWarmUpBrowser();
  
  // State variables
  const [email, setEmail] = useState('alex@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Triggered when Sign Up is pressed
  const handleSignUp = async () => {
    if (!isLoaded) return;
    
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send the 6-digit OTP code to user's email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      
      // Open verification modal
      setModalVisible(true);
    } catch (err: any) {
      console.error('Sign Up error:', err);
      const errMsg = err?.message || err?.errors?.[0]?.message || 'Sign up failed. Please try again.';
      alert(errMsg);
    }
  };

  // Called to complete verification when the 6th digit is correctly entered in the modal
  const handleVerifyCode = async (code: string) => {
    if (!isLoaded) return;

    const completeSignUp = await signUp.attemptEmailAddressVerification({
      code,
    });

    if (completeSignUp.status === 'complete') {
      await setActive({ session: completeSignUp.createdSessionId });
      setModalVisible(false);
      router.replace('/');
    } else {
      console.error('Sign up incomplete:', completeSignUp.status);
      throw new Error(`Sign up is incomplete. Status: ${completeSignUp.status}`);
    }
  };

  // Handles social SSO authentication calls
  const handleSSO = async (strategy: 'oauth_google' | 'oauth_facebook' | 'oauth_apple') => {
    try {
      const { createdSessionId, setActive: setSSOActive } = await startSSOFlow({
        strategy,
        redirectUrl: Linking.createURL('/oauth-callback', { scheme: 'languages' }),
      });

      if (createdSessionId && setSSOActive) {
        await setSSOActive({ session: createdSessionId });
        router.replace('/');
      }
    } catch (err: any) {
      console.error('SSO Login error:', err);
      const errMsg = err?.message || err?.errors?.[0]?.message || 'Social login failed. Please try again.';
      alert(errMsg);
    }
  };


  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          <View className="flex-1 justify-between px-6 py-4">
            
            {/* Header / Back Navigation */}
            <View className="flex-row items-center justify-between mb-4">
              <Link href="/onboarding" asChild>
                <Pressable className="w-10 h-10 items-center justify-center bg-surface border border-border/40 rounded-full active:opacity-70">
                  <Ionicons name="chevron-back" size={22} color="#0D132B" />
                </Pressable>
              </Link>
              {/* Empty placeholder for perfect alignment */}
              <View className="w-10 h-10" />
            </View>

            {/* Main Content Section */}
            <View className="flex-1 justify-center max-w-[400px] w-full self-center">
              
              {/* Title & Subtitle */}
              <View className="mb-2">
                <Text className="text-[28px] font-poppins-bold text-text-primary tracking-tight leading-tight">
                  Create your account
                </Text>
                <Text className="text-body-md font-poppins text-text-secondary mt-1">
                  Start your language journey today ✨
                </Text>
              </View>

              {/* Mascot popping up */}
              <View className="items-center justify-center mt-2 mb-4">
                <Image 
                  source={mascotAuth} 
                  className="w-[120px] h-[120px]"
                  contentFit="contain"
                />
              </View>

              {/* Inputs Form Block */}
              <View className="gap-3">
                
                {/* Email Outlined Input */}
                <View className="bg-surface/50 border border-border/80 px-4 py-2.5 rounded-2xl focus-within:border-lingua-purple">
                  <Text className="text-[11px] font-poppins-bold text-text-secondary uppercase tracking-wider">
                    Email
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    className="text-[16px] font-poppins-semibold text-text-primary mt-0.5 py-0.5"
                    style={{ outline: 'none' } as any}
                  />
                </View>

                {/* Password Outlined Input */}
                <View className="bg-surface/50 border border-border/80 px-4 py-2.5 rounded-2xl">
                  <Text className="text-[11px] font-poppins-bold text-text-secondary uppercase tracking-wider">
                    Password
                  </Text>
                  <View className="flex-row items-center justify-between mt-0.5">
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      underlineColorAndroid="transparent"
                      className="text-[16px] font-poppins-semibold text-text-primary flex-1 py-0.5"
                      style={{ outline: 'none' } as any}
                    />
                    <Pressable 
                      onPress={() => setShowPassword(!showPassword)}
                      className="p-1 active:opacity-75"
                    >
                      <Ionicons 
                        name={showPassword ? "eye" : "eye-off"} 
                        size={20} 
                        color="#6B7280" 
                      />
                    </Pressable>
                  </View>
                </View>

              </View>

              {/* Primary Call-to-Action Sign Up Button */}
              <Pressable 
                onPress={handleSignUp}
                className="mt-6 active:scale-[0.98] transition-all"
              >
                <View className="bg-lingua-purple flex-row items-center justify-center py-4 rounded-2xl border-t border-white/20 shadow-lg shadow-lingua-purple/35">
                  <Text className="text-h4 font-poppins-semibold text-white tracking-wide">
                    Sign Up
                  </Text>
                </View>
              </Pressable>

              {/* Divider Block */}
              <View className="flex-row items-center my-6">
                <View className="flex-1 h-[1px] bg-border/50" />
                <Text className="px-4 text-caption font-poppins-medium text-text-secondary">
                  or continue with
                </Text>
                <View className="flex-1 h-[1px] bg-border/50" />
              </View>

              {/* Social Login Grid Stack */}
              <View className="gap-2.5">
                
                {/* Google Button */}
                <Pressable 
                  onPress={() => handleSSO('oauth_google')}
                  className="bg-white border border-border/60 py-3.5 px-6 rounded-2xl flex-row items-center justify-center active:bg-surface transition-all"
                >
                  <Ionicons name="logo-google" size={18} color="#EA4335" />
                  <Text className="text-body-md font-poppins-medium text-text-primary ml-3">
                    Continue with Google
                  </Text>
                </Pressable>

                {/* Facebook Button */}
                <Pressable 
                  onPress={() => handleSSO('oauth_facebook')}
                  className="bg-white border border-border/60 py-3.5 px-6 rounded-2xl flex-row items-center justify-center active:bg-surface transition-all"
                >
                  <Ionicons name="logo-facebook" size={18} color="#1877F2" />
                  <Text className="text-body-md font-poppins-medium text-text-primary ml-3">
                    Continue with Facebook
                  </Text>
                </Pressable>

                {/* Apple Button */}
                <Pressable 
                  onPress={() => handleSSO('oauth_apple')}
                  className="bg-white border border-border/60 py-3.5 px-6 rounded-2xl flex-row items-center justify-center active:bg-surface transition-all"
                >
                  <Ionicons name="logo-apple" size={18} color="#000000" />
                  <Text className="text-body-md font-poppins-medium text-text-primary ml-3">
                    Continue with Apple
                  </Text>
                </Pressable>

              </View>

            </View>

            {/* Bottom Nav Switcher Link */}
            <View className="items-center justify-center pt-6 pb-2">
              <Text className="text-body-sm font-poppins text-text-secondary">
                Already have an account?{' '}
                <Link href="/signin" asChild>
                  <Text className="font-poppins-semibold text-lingua-purple active:opacity-75">
                    Log in
                  </Text>
                </Link>
              </Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Verification Modal Component */}
      <VerificationModal
        visible={modalVisible}
        email={email}
        onClose={() => setModalVisible(false)}
        onVerifyCode={handleVerifyCode}
      />
    </SafeAreaView>
  );
}
