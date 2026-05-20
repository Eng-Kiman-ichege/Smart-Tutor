import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageId } from '../types/learning';

interface LearningState {
  selectedLanguage: LanguageId | null;
  setSelectedLanguage: (lang: LanguageId | null) => void;
  clearLanguage: () => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),
      clearLanguage: () => set({ selectedLanguage: null }),
    }),
    {
      name: 'learning-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
