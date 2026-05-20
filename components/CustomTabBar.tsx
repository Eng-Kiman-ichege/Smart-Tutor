import React, { useEffect } from 'react';
import { View, Text, Pressable, Platform, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  interpolate 
} from 'react-native-reanimated';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { width: screenWidth } = useWindowDimensions();
  
  // Tab Bar Dimensions
  const tabBarHeight = 85;
  const paddingBottom = Platform.OS === 'ios' ? 24 : 12;
  const contentHeight = tabBarHeight - paddingBottom;
  
  const totalTabs = state.routes.length;
  const tabWidth = screenWidth / totalTabs;
  const circleSize = 52;
  
  // Shared value for sliding active circle background
  const translateX = useSharedValue(0);

  useEffect(() => {
    // Calculate the target center position for the active circle
    const targetX = state.index * tabWidth + (tabWidth - circleSize) / 2;
    translateX.value = withSpring(targetX, {
      damping: 18,
      stiffness: 140,
    });
  }, [state.index, tabWidth]);

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View 
      className="bg-white border-t border-border/40 flex-row relative"
      style={{ 
        height: tabBarHeight, 
        paddingBottom: paddingBottom,
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.03)'
      }}
    >
      {/* Sliding Active Circle Indicator */}
      <Animated.View 
        className="bg-lingua-purple rounded-full absolute"
        style={[
          animatedCircleStyle,
          {
            width: circleSize,
            height: circleSize,
            top: (contentHeight - circleSize) / 2,
            borderRadius: circleSize / 2,
          }
        ]}
      />

      {/* Tab Buttons */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // Trigger light haptic on press
            if (Platform.OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            }
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Determine layout icons and labels
        let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
        let label = 'Home';

        if (route.name === 'index') {
          iconName = isFocused ? 'home' : 'home-outline';
          label = 'Home';
        } else if (route.name === 'learn') {
          iconName = isFocused ? 'book' : 'book-outline';
          label = 'Learn';
        } else if (route.name === 'ai-teacher') {
          iconName = isFocused ? 'sparkles' : 'sparkles-outline';
          label = 'AI Teacher';
        } else if (route.name === 'chat') {
          iconName = isFocused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          label = 'Chat';
        } else if (route.name === 'profile') {
          iconName = isFocused ? 'person' : 'person-outline';
          label = 'Profile';
        }

        return (
          <TabItem
            key={route.key}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            iconName={iconName}
            label={label}
            tabWidth={tabWidth}
            contentHeight={contentHeight}
          />
        );
      })}
    </View>
  );
}

// Inner Component for Tab Item to isolate reanimated styles per button
interface TabItemProps {
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  tabWidth: number;
  contentHeight: number;
}

function TabItem({ 
  isFocused, 
  onPress, 
  onLongPress, 
  iconName, 
  label, 
  tabWidth, 
  contentHeight 
}: TabItemProps) {
  const activeProgress = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    activeProgress.value = withTiming(isFocused ? 1 : 0, { duration: 200 });
  }, [isFocused]);

  // Icon position & scale animations
  const animatedIconStyle = useAnimatedStyle(() => {
    // When active, center icon in circle (Y=0). When inactive, shift up (Y=-6) to leave space for label
    const translateY = interpolate(activeProgress.value, [0, 1], [-5, 0]);
    const scale = interpolate(activeProgress.value, [0, 1], [1, 1.12]);

    return {
      transform: [
        { translateY },
        { scale }
      ],
    };
  });

  // Label opacity & scale animations
  const animatedLabelStyle = useAnimatedStyle(() => {
    const opacity = interpolate(activeProgress.value, [0, 1], [1, 0]);
    const scale = interpolate(activeProgress.value, [0, 1], [1, 0.8]);
    const translateY = interpolate(activeProgress.value, [0, 1], [0, 10]);

    return {
      opacity,
      transform: [
        { scale },
        { translateY }
      ],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ width: tabWidth, height: contentHeight }}
      className="items-center justify-center relative"
    >
      {/* Icon Wrapper */}
      <Animated.View style={animatedIconStyle} className="items-center justify-center z-10">
        <Ionicons 
          name={iconName} 
          size={24} 
          color={isFocused ? '#FFFFFF' : '#8F9BB3'} 
        />
      </Animated.View>

      {/* Label Wrapper */}
      <Animated.View 
        style={[animatedLabelStyle, { position: 'absolute', bottom: 6 }]} 
        className="items-center justify-center"
      >
        <Text 
          className="text-caption font-poppins-semibold text-[#8F9BB3]"
          numberOfLines={1}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
