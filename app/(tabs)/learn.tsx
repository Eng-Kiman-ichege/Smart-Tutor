import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LearnScreenPlaceholder() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
      <View className="items-center">
        <Text className="text-h2 font-poppins-bold text-text-primary text-center">
          Learn Screen
        </Text>
        <Text className="text-body-md font-poppins text-text-secondary text-center mt-2">
          This is a placeholder for the Learn Screen.
        </Text>
      </View>
    </SafeAreaView>
  );
}
