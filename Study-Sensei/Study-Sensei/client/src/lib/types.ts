export type ConfidenceLevel = 'confident' | 'somewhat' | 'not-confident';

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  confidence: ConfidenceLevel;
}

export interface Subject {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Stats {
  total: number;
  confident: number;
  somewhat: number;
  notConfident: number;
}
