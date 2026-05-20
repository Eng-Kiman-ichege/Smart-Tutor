import { Lesson } from '../types/learning';

export const lessons: Lesson[] = [
  // SPANISH - UNIT 1
  {
    id: 'es_lesson_1',
    unitId: 'es_unit_1',
    order: 1,
    title: 'Greetings & Introductions',
    description: 'Learn how to say hello and introduce yourself in Spanish.',
    goals: ['Say hello and goodbye', 'Ask someone how they are', 'Introduce yourself'],
    aiTeacherPrompt: {
      persona: 'You are a friendly and encouraging Spanish teacher named Maria. You are energetic and patient with beginners.',
      instructions: 'Guide the student through basic greetings. Speak slowly and clearly. Encourage them to repeat after you and focus on their pronunciation of the H (silent) and J (like an English H).',
      scenario: 'Meeting a new friend for the first time.',
    },
    activities: [
      {
        id: 'es_l1_a1',
        type: 'vocabulary',
        title: 'Learn the Basics',
        vocabulary: [
          { word: 'Hola', translation: 'Hello', pronunciation: 'OH-lah' },
          { word: 'Adiós', translation: 'Goodbye', pronunciation: 'ah-DYOHS' },
          { word: 'Gracias', translation: 'Thank you', pronunciation: 'GRAH-syahs' },
          { word: 'Por favor', translation: 'Please', pronunciation: 'por fah-VOHR' },
        ],
      },
      {
        id: 'es_l1_a2',
        type: 'phrase',
        title: 'Useful Phrases',
        phrases: [
          { phrase: '¿Cómo estás?', translation: 'How are you?', pronunciation: 'KOH-moh ehs-TAHS' },
          { phrase: 'Me llamo...', translation: 'My name is...', pronunciation: 'meh YAH-moh' },
          { phrase: 'Mucho gusto', translation: 'Nice to meet you', pronunciation: 'MOO-choh GOOS-toh' },
        ],
      },
      {
        id: 'es_l1_a3',
        type: 'ai_video',
        title: 'Practice with Maria',
        aiPrompt: {
          persona: 'Maria, Spanish Teacher',
          instructions: 'Start by asking the user how they are doing. Wait for them to respond using "¿Cómo estás?" or "Hola". Correct pronunciation gently if needed.',
          scenario: 'Roleplay: You bump into the student on the street.',
        },
      }
    ],
  },
  
  // FRENCH - UNIT 1
  {
    id: 'fr_lesson_1',
    unitId: 'fr_unit_1',
    order: 1,
    title: 'Saying Hello',
    description: 'Learn how to greet people in French.',
    goals: ['Say hello and goodbye', 'Say please and thank you'],
    aiTeacherPrompt: {
      persona: 'You are a patient and elegant French teacher named Pierre.',
      instructions: 'Teach the student basic French pleasantries. Focus on nasal sounds and the correct pronunciation of the French R.',
      scenario: 'Entering a French bakery (boulangerie).',
    },
    activities: [
      {
        id: 'fr_l1_a1',
        type: 'vocabulary',
        title: 'Essential Words',
        vocabulary: [
          { word: 'Bonjour', translation: 'Hello/Good morning', pronunciation: 'bohn-ZHOOR' },
          { word: 'Merci', translation: 'Thank you', pronunciation: 'mair-SEE' },
          { word: 'S\'il vous plaît', translation: 'Please', pronunciation: 'seel voo PLEH' },
        ],
      }
    ]
  },
  
  // JAPANESE - UNIT 1
  {
    id: 'ja_lesson_1',
    unitId: 'ja_unit_1',
    order: 1,
    title: 'Greetings (Aisatsu)',
    description: 'Essential greetings for daily life in Japan.',
    goals: ['Say good morning and hello', 'Thank someone formally'],
    aiTeacherPrompt: {
      persona: 'You are Kenji, an organized and supportive Japanese teacher.',
      instructions: 'Introduce formal and casual greetings. Emphasize bowing culture briefly if asked.',
      scenario: 'Meeting a coworker at the office.',
    },
    activities: [
      {
        id: 'ja_l1_a1',
        type: 'vocabulary',
        title: 'Basic Greetings',
        vocabulary: [
          { word: 'Konnichiwa (こんにちは)', translation: 'Hello', pronunciation: 'kon-nee-chee-wa' },
          { word: 'Arigatou gozaimasu (ありがとうございます)', translation: 'Thank you (formal)', pronunciation: 'ah-ree-gah-toh go-zai-mas' },
        ]
      }
    ]
  }
];
