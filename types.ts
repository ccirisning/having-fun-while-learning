
export interface Coordinate {
  x: number;
  y: number;
}

export interface FeaturePoint {
  id: string;
  coord: Coordinate;
  radius: number;
  label: string;
}

export interface AIDiagnosis {
  score: number;
  phoneticAccuracy: number;
  rhythmScore: number;
  feedback: string;
  comparisonWaveform: string;
}

export interface LinguisticInfo {
  en: string;
  cn: string;
}

export interface KanaData {
  id: string;
  char: string;
  romaji: string;
  type: 'particle' | 'noun' | 'phonetic';
  linguistic_meaning: LinguisticInfo;
  structural_feature: string;
  usage_example: {
    word: string;
    reading: string;
    meaning: string;
  };
  confusables: string[];
  keyFeatures: FeaturePoint[];
  exampleSentence: {
    jp: string;
    reading: string;
    en: string;
    level: 'N1' | 'N5';
  };
}

export type AppView = 'SETUP' | 'DRILL' | 'SUMMARY';

export interface SessionState {
  queue: string[];
  currentIndex: number;
  batchSize: number;
  startTime: number | null;
}
