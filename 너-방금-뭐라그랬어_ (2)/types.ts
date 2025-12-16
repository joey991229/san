import { Type } from "@google/genai";

export enum CharacterId {
  JAPAN = 'japan',
  USA = 'usa',
  FRANCE = 'france',
  BRAZIL = 'brazil',
  KOREA = 'korea',
  UK = 'uk',
  GREECE = 'greece',
  VIETNAM = 'vietnam',
  CHINA = 'china',
  IRAN = 'iran',
  AUSTRALIA = 'australia'
}

export enum Emotion {
  HAPPY = 'happy',
  SURPRISED = 'surprised',
  CONFUSED = 'confused',
  EXCITED = 'excited',
  NEUTRAL = 'neutral',
  POSITIVE = 'positive',
  NEGATIVE = 'negative'
}

export interface CharacterImages {
  default: string;
  positive: string;
  negative: string;
}

export interface CharacterProfile {
  id: CharacterId;
  name: string;
  country: string;
  color: string;     // Background color class fallback
  textColor: string; // Text color class
  description: string;
  images: CharacterImages;
}

export interface CharacterReaction {
  characterId: CharacterId;
  dialogue: string;
  emotion: Emotion;
  actionDescription: string;
}

export interface Gesture {
  id: string;
  label: string;
  icon: string;
  prompt: string;
  relatedCharacters: CharacterId[];
  culturalNote?: CulturalNote[];
}

export interface CulturalNote {
  characterId: CharacterId;
  note: string;
  isNegative?: boolean;
}

// Schema for Gemini JSON response
export const ReactionSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      characterId: { type: Type.STRING },
      dialogue: { type: Type.STRING },
      emotion: { type: Type.STRING, enum: [Emotion.HAPPY, Emotion.SURPRISED, Emotion.CONFUSED, Emotion.EXCITED, Emotion.NEUTRAL, Emotion.POSITIVE, Emotion.NEGATIVE] },
      actionDescription: { type: Type.STRING }
    },
    required: ["characterId", "dialogue", "emotion", "actionDescription"]
  }
};