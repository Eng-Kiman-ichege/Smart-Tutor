import { useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
   useSharedValue, 
   useAnimatedStyle, 
   withRepeat, 
   withTiming, 
   withSequence,
   withDelay,
   Easing 
 } from 'react-native-reanimated';
 
 // Top-level imports for assets
 import moscotLogo from '../assets/images/moscot-logo.png';
 import mascotWelcome from '../assets/images/mascot-welcome.png';
 
 export default function OnboardingScreen() {
   // Shared values for floating animations
   const helloY = useSharedValue(0);
   const holaY = useSharedValue(0);
   const nihaoY = useSharedValue(0);
   
   // Shared values for mascot & glow entrance
   const mascotScale = useSharedValue(0.9);
   const mascotOpacity = useSharedValue(0);
 
   useEffect(() => {
     // Mascot entrance animation
     mascotScale.value = withTiming(1, { 
       duration: 800, 
       easing: Easing.out(Easing.back(1.2)) 
     });
     mascotOpacity.value = withTiming(1, { duration: 600 });
 
     // Floating animations for each bubble with organic timing offsets
     helloY.value = withRepeat(
       withSequence(
         withTiming(-5, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
         withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
       ),
       -1,
       true
     );
 
     holaY.value = withDelay(
       300,
       withRepeat(
         withSequence(
           withTiming(-7, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
           withTiming(0, { duration: 2200, easing: Easing.inOut(Easing.ease) })
         ),
         -1,
         true
       )
     );
 
     nihaoY.value = withDelay(
       600,
       withRepeat(
         withSequence(
           withTiming(-4, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
           withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.ease) })
         ),
         -1,
         true
       )
     );
   }, []);
 
   // Animated styles for floating speech bubbles
   const helloAnimatedStyle = useAnimatedStyle(() => ({
     transform: [{ translateY: helloY.value }, { rotate: '-6deg' }],
   }));
 
   const holaAnimatedStyle = useAnimatedStyle(() => ({
     transform: [{ translateY: holaY.value }, { rotate: '6deg' }],
   }));
 
   const nihaoAnimatedStyle = useAnimatedStyle(() => ({
     transform: [{ translateY: nihaoY.value }, { rotate: '8deg' }],
   }));
 
   const mascotAnimatedStyle = useAnimatedStyle(() => ({
     transform: [{ scale: mascotScale.value }],
     opacity: mascotOpacity.value,
   }));
 
   return (
     <SafeAreaView className="flex-1 bg-white">
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
 
           {/* Center Main Content Container */}
           <View className="flex-1 justify-center max-w-[400px] w-full self-center">
             
             {/* Modern Typography Text Section */}
             <View className="mb-4">
               <View className="flex-row items-center mb-2">
                 <View className="w-8 h-[2px] bg-lingua-purple/30 mr-2" />
                 <Text className="text-caption font-poppins-bold uppercase tracking-[0.2em] text-lingua-purple">AI-Powered Learning</Text>
               </View>
               <Text className="text-[32px] font-poppins-bold text-text-primary leading-[1.15] tracking-tight">
                 Your AI language{'\n'}
                 <Text className="text-lingua-purple font-poppins-bold">teacher.</Text>
               </Text>
               <Text className="text-body-md font-poppins text-text-secondary mt-3 leading-[1.6]">
                 Real conversations, personalized lessons, anytime, anywhere.
               </Text>
             </View>
 
             {/* Mascot & Modern Ambient Glow Backdrop */}
             <View className="items-center justify-center my-6 relative py-4">
               <View className="relative w-full max-w-[290px] aspect-square items-center justify-center">
                 
                 {/* Soft Ambient Aurora Backdrops (Overlapping Glowing Orbs - Android-Safe) */}
                 <View className="absolute w-[220px] h-[220px] rounded-full bg-lingua-purple/[0.04] -z-10" />
                 <View className="absolute w-[160px] h-[160px] rounded-full bg-lingua-blue/[0.04] -z-10 translate-x-[30px] translate-y-[-30px]" />
                 <View className="absolute w-[270px] h-[270px] rounded-full border border-surface/40 -z-10" />
                 <View className="absolute w-[210px] h-[210px] rounded-full border border-dashed border-border/40 -z-10" />
 
                 {/* Mascot Image (Animated Entry) */}
                 <Animated.View style={mascotAnimatedStyle} className="items-center justify-center">
                   <Image 
                     source={mascotWelcome} 
                     className="w-[230px] h-[230px]"
                     contentFit="contain"
                   />
                 </Animated.View>
                 
                 {/* Hello! Glassmorphic Speech Bubble (Top Left) */}
                 <Animated.View 
                   style={helloAnimatedStyle}
                   className="absolute top-[8%] left-[0%] bg-white/95 border border-border/40 px-4 py-2 rounded-2xl shadow-lg"
                 >
                   <Text className="text-[14px] font-poppins-semibold text-text-primary">Hello!</Text>
                 </Animated.View>
 
                 {/* ¡Hola! Glassmorphic Speech Bubble (Top Right) */}
                 <Animated.View 
                   style={holaAnimatedStyle}
                   className="absolute top-[2%] right-[4%] bg-white/95 border border-border/40 px-4 py-2 rounded-2xl shadow-lg"
                 >
                   <Text className="text-[14px] font-poppins-semibold text-lingua-purple">¡Hola!</Text>
                 </Animated.View>
 
                 {/* 你好! Glassmorphic Speech Bubble (Middle Right) */}
                 <Animated.View 
                   style={nihaoAnimatedStyle}
                   className="absolute top-[38%] right-[0%] bg-white/95 border border-border/40 px-4 py-2 rounded-2xl shadow-lg"
                 >
                   <Text className="text-[14px] font-poppins-semibold text-[#FF6C3B]">你好!</Text>
                 </Animated.View>
               </View>
             </View>
           </View>
 
           {/* Bottom Button Section (Ultra-Modern Premium Button) */}
           <View className="pt-6 pb-4 max-w-[400px] w-full self-center">
             <Link href="/signup" asChild>
               <Pressable className="active:scale-[0.98] transition-all">
                 <View className="bg-lingua-purple flex-row items-center justify-center py-4 rounded-2xl border-t border-white/20 shadow-lg shadow-lingua-purple/30 relative overflow-hidden">
                   <Text className="text-h4 font-poppins-semibold text-white tracking-wide">Get Started</Text>
                   <View className="absolute right-6">
                     <Ionicons name="arrow-forward" size={20} color="white" />
                   </View>
                 </View>
               </Pressable>
             </Link>
           </View>
 
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 }
