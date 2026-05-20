import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface VerificationModalProps {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerifySuccess: () => void;
}

export default function VerificationModal({ 
  visible, 
  email, 
  onClose, 
  onVerifySuccess 
}: VerificationModalProps) {
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);

  // Auto-focus the input when modal becomes visible
  useEffect(() => {
    if (visible) {
      setCode('');
      // Delay slightly to ensure layout has mounted and keyboard can open
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  // Handle text change and verify when 6 digits are entered
  const handleTextChange = (text: string) => {
    // Only allow numbers
    const cleanText = text.replace(/[^0-9]/g, '');
    setCode(cleanText);

    if (cleanText.length === 6) {
      // Small delay to allow the last digit to render visually before routing
      setTimeout(() => {
        onVerifySuccess();
      }, 150);
    }
  };

  // Render the 6 styled digit boxes
  const renderCodeBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 6; i++) {
      const char = code[i] || '';
      const isFocused = i === code.length && visible;

      boxes.push(
        <Pressable 
          key={i} 
          onPress={() => inputRef.current?.focus()}
          className={`w-11 h-14 bg-surface border items-center justify-center rounded-xl shadow-sm transition-all ${
            isFocused 
              ? 'border-lingua-purple border-[2px] bg-white' 
              : char 
                ? 'border-text-primary border-[1.5px]' 
                : 'border-border'
          }`}
        >
          <Text className="text-[20px] font-poppins-bold text-text-primary">
            {char}
          </Text>
        </Pressable>
      );
    }
    return boxes;
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Background Dim */}
      <View className="flex-1 bg-text-primary/60 justify-center items-center">
        
        {/* Keyboard Avoiding Container */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="w-full items-center justify-center px-6"
        >
          {/* Modal Card */}
          <View className="w-full max-w-[340px] bg-white rounded-[28px] p-6 border border-border shadow-2xl relative">
            
            {/* Close Button */}
            <Pressable 
              onPress={onClose}
              className="absolute top-4 right-4 w-8 h-8 items-center justify-center bg-surface rounded-full active:opacity-70"
            >
              <Ionicons name="close" size={18} color="#0D132B" />
            </Pressable>

            {/* Email Icon / Header */}
            <View className="items-center mt-2 mb-4">
              <View className="w-12 h-12 bg-lingua-purple/10 rounded-full items-center justify-center mb-3">
                <Ionicons name="mail-open" size={24} color="#6C4EF5" />
              </View>
              <Text className="text-h3 font-poppins-bold text-text-primary text-center tracking-tight">
                Verify your email
              </Text>
              <Text className="text-body-sm font-poppins text-text-secondary text-center mt-2 leading-[1.5] px-2">
                We've sent a 6-digit verification code to {'\n'}
                <Text className="font-poppins-semibold text-text-primary">{email || 'your email'}</Text>
              </Text>
            </View>

            {/* Code Inputs Container */}
            <View className="flex-row justify-between w-full my-4 px-1">
              {renderCodeBoxes()}
            </View>

            {/* Hidden Input field backending the boxes */}
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleTextChange}
              keyboardType="number-pad"
              maxLength={6}
              style={styles.hiddenInput}
              caretHidden
              autoFocus
            />

            {/* Help Links */}
            <View className="items-center mt-4">
              <Text className="text-caption font-poppins text-text-secondary">
                Didn't receive the code?{' '}
                <Text className="font-poppins-semibold text-lingua-purple active:opacity-70">
                  Resend code
                </Text>
              </Text>
            </View>

          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  }
});
