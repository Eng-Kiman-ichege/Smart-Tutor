export type LanguageId = 'es' | 'fr' | 'ja' | 'de' | 'it';

export interface Language {
  id: LanguageId;
  name: string;
  flag: string; // Emoji or image path
  description: string;
}

export type ActivityType = 
  | 'vocabulary' 
  | 'phrase' 
  | 'multiple_choice' 
  | 'ai_chat' 
  | 'ai_video';

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation?: string;
}

export interface PhraseItem {
  phrase: string;
  translation: string;
  pronunciation?: string;
}

export interface AITeacherPrompt {
  persona: string;
  instructions: string;
  scenario: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  // Payload for different activity types
  vocabulary?: VocabularyItem[];
  phrases?: PhraseItem[];
  aiPrompt?: AITeacherPrompt;
}

export interface Lesson {
  id: string;
  unitId: string;
  order: number;
  title: string;
  description: string;
  goals: string[];
  activities: Activity[];
  // High-level AI teacher prompt for the entire lesson, for future Vision Agent capability
  aiTeacherPrompt?: AITeacherPrompt;
}

export interface Unit {
  id: string;
  languageId: LanguageId;
  order: number;
  title: string;
  description: string;
}
